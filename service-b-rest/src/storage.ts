import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(__dirname, '../total.txt');

export async function readTotal(): Promise<number> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return parseInt(content || '0', 10);
  } catch {
    return 0;
  }
}

export async function writeTotal(value: number): Promise<void> {
  await fs.writeFile(filePath, value.toString(), 'utf-8');
}
