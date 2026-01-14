import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertMember } from "@shared/routes";

export function useMembers(filters?: { search?: string; skill?: string }) {
  return useQuery({
    queryKey: [api.members.list.path, filters],
    queryFn: async () => {
      const url = new URL(api.members.list.path, window.location.origin);
      if (filters?.search) url.searchParams.append("search", filters.search);
      if (filters?.skill) url.searchParams.append("skill", filters.skill);
      
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch members");
      return api.members.list.responses[200].parse(await res.json());
    },
  });
}

export function useMember(id: number) {
  return useQuery({
    queryKey: [api.members.get.path, id],
    queryFn: async () => {
      const url = api.members.get.path.replace(":id", id.toString());
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch member");
      return api.members.get.responses[200].parse(await res.json());
    },
  });
}

export function useCreateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertMember) => {
      const res = await fetch(api.members.create.path, {
        method: api.members.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create member");
      return api.members.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.members.list.path] });
    },
  });
}
