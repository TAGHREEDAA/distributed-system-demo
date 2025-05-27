import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// فتح اتصال بقاعدة البيانات
export async function initDB() {
    const db = await open({
        filename: './outbox.db',
        driver: sqlite3.Database
    });

    // إنشاء الجدول لو مش موجود
    await db.exec(`
    CREATE TABLE IF NOT EXISTS outbox_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      payload TEXT NOT NULL,
      sent_at TIMESTAMP
    );
  `);

    return db;
}
