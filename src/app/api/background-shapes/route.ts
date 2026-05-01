import { readdir } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

export async function GET() {
  const directory = path.join(process.cwd(), "public", "background-shapes");

  try {
    const files = await readdir(directory);
    const pngFiles = files
      .filter((file) => file.toLowerCase().endsWith(".png"))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .map((file) => `/background-shapes/${file}`);

    return Response.json({ files: pngFiles });
  } catch {
    return Response.json({ files: [] });
  }
}
