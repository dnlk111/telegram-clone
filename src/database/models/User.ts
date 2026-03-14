import { field, date, readonly } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class User extends Model {
  static table = "users";

  @field("external_id") externalId!: string;
  @field("username") username!: string;
  @field("first_name") firstName!: string;
  @field("last_name") lastName!: string;
  @field("phone") phone!: string;
  @field("avatar_uri") avatarUri!: string;
  @field("is_online") isOnline!: boolean;
  @field("last_seen_at") lastSeenAt!: number;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  get displayName(): string {
    if (this.firstName || this.lastName) {
      return [this.firstName, this.lastName].filter(Boolean).join(" ");
    }
    return this.username || this.phone || "User";
  }
}
