import { field, date, readonly } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Chat extends Model {
  static table = "chats";

  @field("external_id") externalId!: string;
  @field("type") type!: "user" | "group" | "channel" | "saved";
  @field("title") title!: string;
  @field("avatar_uri") avatarUri!: string;
  @field("last_message_id") lastMessageId!: string;
  @field("last_message_at") lastMessageAt!: number;
  @field("last_message_preview") lastMessagePreview!: string;
  @field("unread_count") unreadCount!: number;
  @field("is_pinned") isPinned!: boolean;
  @field("is_muted") isMuted!: boolean;
  @field("is_archived") isArchived!: boolean;
  @field("folder_id") folderId!: string;
  @field("draft") draft!: string;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
