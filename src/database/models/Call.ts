import { field, date, readonly } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Call extends Model {
  static table = "calls";

  @field("external_id") externalId!: string;
  @field("user_id") userId!: string;
  @field("chat_id") chatId!: string;
  @field("type") type!: "voice" | "video";
  @field("direction") direction!: "incoming" | "outgoing";
  @field("status") status!: "completed" | "missed" | "declined";
  @field("duration_seconds") durationSeconds!: number;
  @field("started_at") startedAt!: number;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
