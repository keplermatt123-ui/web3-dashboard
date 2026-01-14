
import { db } from "./db";
import {
  members,
  events,
  type Member,
  type InsertMember,
  type Event,
  type InsertEvent
} from "@shared/schema";
import { eq, ilike, desc, or, arrayContains } from "drizzle-orm";

export interface IStorage {
  getMembers(search?: string, skill?: string): Promise<Member[]>;
  getMember(id: number): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  
  getEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
}

export class DatabaseStorage implements IStorage {
  async getMembers(search?: string, skill?: string): Promise<Member[]> {
    let query = db.select().from(members);
    
    if (search) {
      const searchLower = `%${search.toLowerCase()}%`;
      query.where(
        or(
            ilike(members.name, searchLower),
            ilike(members.role, searchLower)
        )
      );
    }

    // Note: Simple array filtering might need raw SQL or specific postgres operators if complex
    // For now, we return all and filter in memory if strictly needed, or trust arrayContains if supported by driver
    // arrayContains(members.skills, [skill])
    
    const results = await query.orderBy(desc(members.isCore), members.name);
    
    if (skill) {
        return results.filter(m => m.skills?.some(s => s.toLowerCase() === skill.toLowerCase()));
    }
    
    return results;
  }

  async getMember(id: number): Promise<Member | undefined> {
    const [member] = await db.select().from(members).where(eq(members.id, id));
    return member;
  }

  async createMember(insertMember: InsertMember): Promise<Member> {
    const [member] = await db.insert(members).values(insertMember).returning();
    return member;
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.date));
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }
}

export const storage = new DatabaseStorage();
