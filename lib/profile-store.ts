import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "profiles.json");

type ProfileStore = Record<string, string>;

async function ensureDataDir(): Promise<void> {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
}

async function readStore(): Promise<ProfileStore> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as ProfileStore;
  } catch {
    return {};
  }
}

export async function getDisplayName(userId: string): Promise<string | null> {
  const store = await readStore();
  const value = store[userId]?.trim();
  return value ? value : null;
}

export async function setDisplayName(
  userId: string,
  displayName: string,
): Promise<void> {
  await ensureDataDir();
  const store = await readStore();
  store[userId] = displayName.trim();
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}
