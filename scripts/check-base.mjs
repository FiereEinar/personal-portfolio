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

try {
  const build = spawnSync(
    process.execPath,
    [viteBin, "build", "--base=/repo/", `--outDir=${outDir}`],
    { stdio: "inherit" },
  );

  if (build.status !== 0) {
    throw new Error(`vite build failed with exit code ${build.status}`);
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

  console.log(
    `check:base passed: ${scripts.length} JS asset(s) with no root-absolute portrait reference`,
  );
} finally {
  await rm(outDir, { recursive: true, force: true });
}
