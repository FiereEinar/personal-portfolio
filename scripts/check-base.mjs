import { spawnSync } from "node:child_process";
import { readdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";

const outDir = ".base-check";
const viteBin = join(process.cwd(), "node_modules", "vite", "bin", "vite.js");
const portraitReference = /(["'])\/profile\.jpg\1/;

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

  console.log(
    `check:base passed: ${scripts.length} JS asset(s) with no root-absolute portrait reference`,
  );
} finally {
  await rm(outDir, { recursive: true, force: true });
}
