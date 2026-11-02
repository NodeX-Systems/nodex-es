// Post-build step: pages whose feature flag is off (lib/features.ts) still
// compile (they call notFound()), which would leave a "Page not found" body
// served with a 200 status. Removing their folders from the static export
// makes the host answer with its real 404 page instead.
import { readFileSync, rmSync, existsSync } from "node:fs";

const features = readFileSync(new URL("../lib/features.ts", import.meta.url), "utf8");
const pages = { industries: "industries", insights: "insights", news: "news", partners: "partners" };

for (const [flag, slug] of Object.entries(pages)) {
  const on = new RegExp(`${flag}:\\s*true`).test(features);
  if (on) continue;
  for (const dir of [`out/${slug}`, `out/es/${slug}`]) {
    if (existsSync(dir)) {
      rmSync(dir, { recursive: true });
      console.log(`pruned ${dir} (feature "${flag}" is off)`);
    }
  }
}
