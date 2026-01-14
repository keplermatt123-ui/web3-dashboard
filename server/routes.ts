
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Members
  app.get(api.members.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const skill = req.query.skill as string | undefined;
    const members = await storage.getMembers(search, skill);
    res.json(members);
  });

  app.get(api.members.get.path, async (req, res) => {
    const member = await storage.getMember(Number(req.params.id));
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  });

  app.post(api.members.create.path, async (req, res) => {
    try {
      const input = api.members.create.input.parse(req.body);
      const member = await storage.createMember(input);
      res.status(201).json(member);
    } catch (err) {
       if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: err.errors[0].message,
            field: err.errors[0].path.join('.'),
          });
        }
        throw err;
    }
  });

  // Events
  app.get(api.events.list.path, async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.post(api.events.create.path, async (req, res) => {
    try {
        const input = api.events.create.input.parse(req.body);
        const event = await storage.createEvent(input);
        res.status(201).json(event);
    } catch (err) {
        if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: err.errors[0].message,
            field: err.errors[0].path.join('.'),
          });
        }
        throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingMembers = await storage.getMembers();
  if (existingMembers.length === 0) {
    const members = [
      {
        name: "Alice Silva",
        role: "Core Team",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        xHandle: "@alicesilva",
        skills: ["Strategy", "Community"],
        isCore: true,
        bio: "Leading Superteam Brazil expansion."
      },
      {
        name: "Bob Santos",
        role: "Rust Developer",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
        xHandle: "@bobsantos_dev",
        skills: ["Rust", "Solana", "Anchor"],
        isCore: false,
        bio: "Building DeFi protocols on Solana."
      },
      {
        name: "Carol Oliveira",
        role: "UI/UX Designer",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
        xHandle: "@carol_design",
        skills: ["Design", "Figma", "Frontend"],
        isCore: false,
        bio: "Creating beautiful Web3 experiences."
      },
      {
        name: "David Costa",
        role: "Frontend Engineer",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        xHandle: "@david_builds",
        skills: ["React", "TypeScript", "Tailwind"],
        isCore: false,
        bio: "Frontend wizard at a leading DEX."
      },
       {
        name: "Elena Souza",
        role: "DevRel",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        xHandle: "@elena_sol",
        skills: ["Education", "Content", "Public Speaking"],
        isCore: true,
        bio: "Teaching the next generation of builders."
      }
    ];

    for (const m of members) {
      await storage.createMember(m);
    }
  }

  const existingEvents = await storage.getEvents();
  if (existingEvents.length === 0) {
    const events = [
      {
        title: "Solana Breakpoint 2024 Watch Party",
        description: "Join us to watch the keynotes and network with local builders.",
        date: new Date("2024-09-20T10:00:00"),
        location: "São Paulo, SP",
        isUpcoming: true,
        registrationUrl: "https://lu.ma/example"
      },
      {
        title: "Superteam Build Station",
        description: "A co-working space for builders participating in the Hackathon.",
        date: new Date("2024-10-15T09:00:00"),
        location: "Rio de Janeiro, RJ",
        isUpcoming: true,
        registrationUrl: "https://lu.ma/example"
      },
       {
        title: "Rust Bootcamp",
        description: "Intensive 4-week Rust course for experienced devs.",
        date: new Date("2024-08-01T19:00:00"),
        location: "Online",
        isUpcoming: false,
        registrationUrl: "https://lu.ma/example"
      }
    ];

    for (const e of events) {
      await storage.createEvent(e);
    }
  }
}
