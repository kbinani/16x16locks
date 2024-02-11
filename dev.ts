import * as esbuild from "esbuild";
import * as path from "path";

(async () => {
  const ctx = await esbuild.context({
    entryPoints: [path.join(__dirname, "src/component/index.tsx")],
    bundle: true,
    outfile: path.join(__dirname, "public", "script", "bundle.js"),
  });
  const { host, port } = await ctx.serve({
    servedir: path.join(__dirname, "public"),
  });
  console.log(`http://${host}:${port}`);
})();
