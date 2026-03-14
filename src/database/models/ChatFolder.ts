import { field, date, readonly } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class ChatFolder extends Model {
  static table = "chat_folders";

  @field("title") title!: string;
  @field("icon") icon!: string;
  @field("filter_flags") filterFlags!: string;
  @field("order") order!: number;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
