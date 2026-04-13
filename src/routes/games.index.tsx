import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { getAllGames } from "@/lib/games-service";
import { GameCard } from "@/components/GameCard";
import type { Game } from "@/lib/games-data";

export const Route = createFileRoute("/games/")({
  head: () => ({
    meta: [
      { title: "Games — Metaforce Studio" },
      { name: "description", content: "Browse all games from Metaforce Studio." },
      { property: "og:title", content: "Games — Metaforce Studio" },
      { property: "og:description", content: "Browse all games from Metaforce Studio." },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [status, setStatus] = useState("All");
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllGames().then((g) => { setAllGames(g); setLoading(false); });
  }, []);

  const genres = useMemo(() => ["All", ...Array.from(new Set(allGames.map((g) => g.genre).filter(Boolean)))], [allGames]);
  const statuses = ["All", "Released", "Early Access", "Coming Soon", "In Development"];

  const filtered = useMemo(() => {
    return allGames.filter((g) => {
      const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "All" || g.genre === genre;
      const matchStatus = status === "All" || g.status === status;
      return matchSearch && matchGenre && matchStatus;
    });
  }, [allGames, search, genre, status]);

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl font-black text-foreground">Game Library</h1>
        <p className="mt-2 text-muted-foreground">Explore our entire collection of titles.</p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-input pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <select value={genre} onChange={(e) => setGenre(e.target.value)} className="rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none">
            {genres.map((g) => <option key={g} value={g}>{g === "All" ? "All Genres" : g}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none">
            {statuses.map((s) => <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((game, i) => <GameCard key={game.id} game={game} index={i} />)}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="mt-20 text-center text-muted-foreground">No games found matching your filters.</div>
        )}
      </div>
    </div>
  );
}
