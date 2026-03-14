import { appSchema, tableSchema } from "@nozbe/watermelondb";

/**
 * WatermelonDB schema — Telegram-like entities
 * Chats, Messages, Users, Media, Saved (Избранное), Calls
 */
export const schema = appSchema({
  version: 1,
  tables: [
    // Users / Contacts
    tableSchema({
      name: "users",
      columns: [
        { name: "external_id", type: "string", isIndexed: true },
        { name: "username", type: "string", isIndexed: true },
        { name: "first_name", type: "string" },
        { name: "last_name", type: "string" },
        { name: "phone", type: "string", isIndexed: true },
        { name: "avatar_uri", type: "string" },
        { name: "is_online", type: "boolean" },
        { name: "last_seen_at", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    // Chat folders (как в Telegram)
    tableSchema({
      name: "chat_folders",
      columns: [
        { name: "title", type: "string" },
        { name: "icon", type: "string" },
        { name: "filter_flags", type: "string" }, // JSON: include muted, channels, etc.
        { name: "order", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    // Chats (dialogs)
    tableSchema({
      name: "chats",
      columns: [
        { name: "external_id", type: "string", isIndexed: true },
        { name: "type", type: "string" }, // 'user' | 'group' | 'channel' | 'saved'
        { name: "title", type: "string" },
        { name: "avatar_uri", type: "string" },
        { name: "last_message_id", type: "string", isIndexed: true },
        { name: "last_message_at", type: "number", isIndexed: true },
        { name: "last_message_preview", type: "string" },
        { name: "unread_count", type: "number" },
        { name: "is_pinned", type: "boolean", isIndexed: true },
        { name: "is_muted", type: "boolean" },
        { name: "is_archived", type: "boolean", isIndexed: true },
        { name: "folder_id", type: "string", isIndexed: true },
        { name: "draft", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    // Chat <-> User (many-to-many for groups)
    tableSchema({
      name: "chat_users",
      columns: [
        { name: "chat_id", type: "string", isIndexed: true },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "role", type: "string" }, // 'member' | 'admin' | 'creator'
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    // Messages
    tableSchema({
      name: "messages",
      columns: [
        { name: "external_id", type: "string", isIndexed: true },
        { name: "chat_id", type: "string", isIndexed: true },
        { name: "sender_id", type: "string", isIndexed: true },
        { name: "text", type: "string" },
        { name: "type", type: "string" }, // 'text' | 'photo' | 'video' | 'voice' | 'file' | 'sticker' | 'gif' | 'video_note'
        { name: "media_uri", type: "string" },
        { name: "media_extra", type: "string" }, // JSON: width, height, duration, waveform, etc.
        { name: "reply_to_id", type: "string", isIndexed: true },
        { name: "forward_from_id", type: "string" },
        { name: "forward_date", type: "number" },
        { name: "forward_signature", type: "string" },
        { name: "is_edited", type: "boolean" },
        { name: "is_outgoing", type: "boolean", isIndexed: true },
        { name: "status", type: "string" }, // 'pending' | 'sent' | 'delivered' | 'read'
        { name: "created_at", type: "number", isIndexed: true },
        { name: "updated_at", type: "number" },
        { name: "reactions", type: "string" }, // JSON: { emoji: count }
      ],
    }),
    // Saved messages (Избранное) — references message_id
    tableSchema({
      name: "saved_items",
      columns: [
        { name: "message_id", type: "string", isIndexed: true },
        { name: "folder", type: "string", isIndexed: true }, // default folder or custom
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    // Call history
    tableSchema({
      name: "calls",
      columns: [
        { name: "external_id", type: "string", isIndexed: true },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "chat_id", type: "string", isIndexed: true },
        { name: "type", type: "string" }, // 'voice' | 'video'
        { name: "direction", type: "string" }, // 'incoming' | 'outgoing'
        { name: "status", type: "string" }, // 'completed' | 'missed' | 'declined'
        { name: "duration_seconds", type: "number" },
        { name: "started_at", type: "number", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
