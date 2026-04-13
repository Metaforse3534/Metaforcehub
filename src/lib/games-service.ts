import { supabase } from "@/integrations/supabase/client";
import { games as staticGames, type Game } from "@/lib/games-data";
import type { Database } from "@/integrations/supabase/types";

type GameRow = Database["public"]["Tables"]["games"]["Row"];

function dbGameToGame(row: GameRow): Game {
  return {
    id: row.slug,
    title: row.title,
    cover: row.cover_url ?? "",
    description: row.description ?? "",
    genre: row.genre ?? "",
    releaseDate: row.release_date ?? "",
    status: (row.status as Game["status"]) ?? "In Development",
    longDescription: row.long_description ?? "",
    features: row.features ?? [],
    screenshots: row.cover_url ? [row.cover_url] : [],
  };
}

export async function getAllGames(): Promise<Game[]> {
  const { data } = await supabase.from("games").select("*").order("created_at", { ascending: false });
  const dbGames = (data ?? []).map(dbGameToGame);
  // Merge: DB games first, then static games (if slug doesn't conflict)
  const dbSlugs = new Set(dbGames.map((g) => g.id));
  const combined = [...dbGames, ...staticGames.filter((g) => !dbSlugs.has(g.id))];
  return combined;
}

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  // Check DB first
  const { data } = await supabase.from("games").select("*").eq("slug", slug).single();
  if (data) return dbGameToGame(data);
  // Fall back to static
  return staticGames.find((g) => g.id === slug);
}
