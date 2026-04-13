import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Download, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { getGameBySlug } from "@/lib/games-service";
import type { Game } from "@/lib/games-data";

export const Route = createFileRoute("/games/$gameId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.gameId} — Metaforce Studio` },
      { name: "description", content: "Game details on Metaforce Studio." },
    ],
  }),
  component: GameDetailPage,
});

const statusColors: Record<string, string> = {
  Released: "bg-chart-3 text-primary-foreground",
  "Early Access": "bg-chart-4 text-primary-foreground",
  "Coming Soon": "bg-primary text-primary-foreground",
  "In Development": "bg-neon-purple text-primary-foreground",
};

function GameDetailPage() {
  const { gameId } = Route.useParams();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGameBySlug(gameId).then((g) => { setGame(g); setLoading(false); });
  }, [gameId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-16 gap-4">
        <h1 className="text-4xl font-bold text-foreground">Game Not Found</h1>
        <Link to="/games" className="text-primary hover:underline">Back to Games</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {game.cover && (
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img src={game.cover} alt={game.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>
      )}

      <div className={`relative z-10 mx-auto max-w-5xl px-4 sm:px-6 ${game.cover ? "-mt-40" : "pt-8"}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/games" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Games
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {game.cover && (
              <div className="w-full flex-shrink-0 lg:w-64">
                <img src={game.cover} alt={game.title} className="w-full rounded-lg border border-border/50 shadow-2xl" />
              </div>
            )}

            <div className="flex-1">
              <span className={`inline-block rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusColors[game.status] ?? "bg-muted text-muted-foreground"}`}>
                {game.status}
              </span>
              <h1 className="mt-3 font-display text-4xl font-black text-foreground sm:text-5xl">{game.title}</h1>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {game.genre && <span className="flex items-center gap-1.5"><Tag className="h-4 w-4 text-primary" /> {game.genre}</span>}
                {game.releaseDate && <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> {game.releaseDate}</span>}
              </div>

              <p className="mt-6 text-muted-foreground leading-relaxed">{game.longDescription || game.description}</p>

              <div className="mt-6 flex gap-3">
                {game.status === "Released" ? (
                  <>
                    <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:glow-neon">
                      <Download className="h-4 w-4" /> Download Now
                    </button>
                    <button className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold text-foreground hover:border-primary/50">
                      <Play className="h-4 w-4" /> Watch Trailer
                    </button>
                  </>
                ) : (
                  <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:glow-neon">
                    {game.status === "Early Access" ? "Get Early Access" : "Wishlist"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {game.features.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-foreground">Key Features</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {game.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
                    <div className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-16 mb-20 rounded-lg border border-border/50 bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              A game by{" "}
              <Link to="/" className="font-semibold text-primary hover:underline">Metaforce Studio</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
