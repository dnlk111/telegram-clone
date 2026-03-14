import { field, date, readonly } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export type MessageType =
  | "text"
  | "photo"
  | "video"
  | "voice"
  | "file"
  | "sticker"
  | "gif"
  | "video_note";

export type MessageStatus = "pending" | "sent" | "delivered" | "read";

export default class Message extends Model {
  static table = "messages";

  @field("external_id") externalId!: string;
  @field("chat_id") chatId!: string;
  @field("sender_id") senderId!: string;
  @field("text") text!: string;
  @field("type") type!: MessageType;
  @field("media_uri") mediaUri!: string;
  @field("media_extra") mediaExtra!: string;
  @field("reply_to_id") replyToId!: string;
  @field("forward_from_id") forwardFromId!: string;
  @field("forward_date") forwardDate!: number;
  @field("forward_signature") forwardSignature!: string;
  @field("is_edited") isEdited!: boolean;
  @field("is_outgoing") isOutgoing!: boolean;
  @field("status") status!: MessageStatus;
  @field("reactions") reactions!: string;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
