import { spawnSync } from "node:child_process";
import { readdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";

const outDir = ".base-check";
const viteBin = join(process.cwd(), "node_modules", "vite", "bin", "vite.js");
const heroSource = await readFile(
  join(process.cwd(), "src", "components", "Hero.tsx"),
  "utf8",
);
const portraitAsset = heroSource.match(/BASE_URL\}([\w.-]+)/)?.[1];

if (!portraitAsset) {
  throw new Error("could not find the hero portrait asset in Hero.tsx");
}

const escapedAsset = portraitAsset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const portraitReference = new RegExp(`(["'\`])/${escapedAsset}\\1`);
const bundledReference = `/repo/${portraitAsset}`;
const projectAssets = [
  "sams-dashboard.webp",
  "reboot-rebellion.webp",
  "statmastery.webp",
];

try {
  const build = spawnSync(
    process.execPath,
    [viteBin, "build", "--base=/repo/", `--outDir=${outDir}`],
    { stdio: "inherit" },
  );

  if (build.status !== 0) {
    throw new Error(`vite build failed with exit code ${build.status}`);
  }

  for (const file of ["index.html", "projects.html"]) {
    const html = await readFile(join(outDir, file), "utf8");
    const rootReferences = [...html.matchAll(/(?:src|href)="(\/[^"]*)"/g)].map(
      (match) => match[1],
    );
    const badReferences = rootReferences.filter((reference) => !reference.startsWith("/repo/"));

    if (badReferences.length > 0) {
      throw new Error(
        `root-absolute reference(s) in ${file}: ${badReferences.join(", ")}`,
      );
    }

    if (!html.includes("/repo/assets/")) {
      throw new Error(`no base-prefixed JS asset found in ${file}`);
    }
  }

  const assetsDir = join(outDir, "assets");
  const entries = await readdir(assetsDir, { recursive: true });
  const scripts = entries.filter((entry) => entry.endsWith(".js"));

  if (scripts.length === 0) {
    throw new Error(`no JavaScript assets found in ${assetsDir}`);
  }

  for (const script of scripts) {
    const source = await readFile(join(assetsDir, script), "utf8");
    if (portraitReference.test(source)) {
      throw new Error(`root-absolute portrait reference found in ${script}`);
    }
  }

  const bundled = (
    await Promise.all(scripts.map((script) => readFile(join(assetsDir, script), "utf8")))
  ).join("\n");

  if (!bundled.includes(bundledReference)) {
    throw new Error(`expected ${bundledReference} in the bundle; the base path was not applied`);
  }

  if (!bundled.includes("/repo/")) {
    throw new Error("the bundle does not contain the /repo/ base path");
  }

  if (/(["'`])\/projects\//.test(bundled)) {
    throw new Error("root-absolute project screenshot reference found in the bundle");
  }

  for (const asset of projectAssets) {
    if (!bundled.includes(`projects/${asset}`)) {
      throw new Error(`project screenshot ${asset} is not referenced in the bundle`);
    }
  }

  console.log(
    `check:base passed: 2 HTML entries and ${scripts.length} JS asset(s) with no root-absolute asset references`,
  );
} finally {
  await rm(outDir, { recursive: true, force: true });
}
