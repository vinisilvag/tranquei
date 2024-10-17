import { sqliteTable, integer, real, text } from "drizzle-orm/sqlite-core";

export const reminder = sqliteTable("reminders", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	message: text("message"),
	timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
	latitude: real("latitude").notNull(),
	longitude: real("longitude").notNull(),
});
