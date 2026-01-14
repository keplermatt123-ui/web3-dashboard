
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  xHandle: text("x_handle"), // Twitter/X handle
  skills: text("skills").array(), // Array of strings
  isCore: boolean("is_core").default(false),
  bio: text("bio"),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  registrationUrl: text("registration_url"),
  isUpcoming: boolean("is_upcoming").default(true),
});

export const insertMemberSchema = createInsertSchema(members).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });

export type Member = typeof members.$inferSelect;
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
