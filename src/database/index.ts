import { Database } from "@nozbe/watermelondb";
import { schema } from "./schema";
import { migrations } from "./migrations";
import User from "./models/User";
import Chat from "./models/Chat";
import ChatFolder from "./models/ChatFolder";
import Message from "./models/Message";
import SavedItem from "./models/SavedItem";
import Call from "./models/Call";

let _database: Database | null = null;

/**
 * Get WatermelonDB instance. Lazy-init so Expo Go doesn't crash on missing native SQLite.
 * Use development build for full WatermelonDB support.
 */
export function getDatabase(): Database | null {
  if (_database !== null) return _database;
  try {
    const SQLiteAdapter = require("@nozbe/watermelondb/adapters/sqlite").default;
    const adapter = new SQLiteAdapter({
      schema,
      migrations,
      jsi: true,
      onSetUpError: (error: Error) => {
        console.error("[WatermelonDB] Setup error:", error);
      },
    });
    _database = new Database({
      adapter,
      modelClasses: [User, Chat, ChatFolder, Message, SavedItem, Call],
    });
    return _database;
  } catch (e) {
    console.warn("[WatermelonDB] Not available (Expo Go?). Use dev build for DB.", e);
    return null;
  }
}

export { schema } from "./schema";
export * from "./models";
