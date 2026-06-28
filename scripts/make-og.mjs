import sharp from "sharp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(join(__dirname, "og-source.svg"));
const out = join(__dirname, "..", "public", "og-image.jpg");

await sharp(svg, { density: 144 })
  .resize(1200, 630)
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(out);

console.log("OG image created:", out);
