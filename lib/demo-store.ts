import { appendFile, mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export async function saveDemoRecord(kind: string, value: Record<string, unknown>) {
  const line = JSON.stringify({ at: new Date().toISOString(), ...value }) + "\n";
  const folders = [
    path.join(process.cwd(), "data"),
    path.join(os.tmpdir(), "ada-atelie"),
  ];

  for (const folder of folders) {
    try {
      await mkdir(folder, { recursive: true });
      await appendFile(path.join(folder, `${kind}.jsonl`), line, "utf8");
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  return false;
}
