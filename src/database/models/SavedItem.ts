import { field, date, readonly } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class SavedItem extends Model {
  static table = "saved_items";

  @field("message_id") messageId!: string;
  @field("folder") folder!: string;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
