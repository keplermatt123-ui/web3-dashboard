
import { z } from 'zod';
import { insertMemberSchema, insertEventSchema, members, events } from './schema';

export const api = {
  members: {
    list: {
      method: 'GET' as const,
      path: '/api/members',
      input: z.object({
        search: z.string().optional(),
        skill: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof members.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/members/:id',
      responses: {
        200: z.custom<typeof members.$inferSelect>(),
        404: z.object({ message: z.string() }),
      }
    },
    create: {
        method: 'POST' as const,
        path: '/api/members',
        input: insertMemberSchema,
        responses: {
            201: z.custom<typeof members.$inferSelect>(),
        }
    }
  },
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events',
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
    create: {
        method: 'POST' as const,
        path: '/api/events',
        input: insertEventSchema,
        responses: {
            201: z.custom<typeof events.$inferSelect>(),
        }
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
