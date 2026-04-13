import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Game } from "@/lib/games-data";

const statusColors: Record<Game["status"], string> = {
  Released: "bg-chart-3 text-primary-foreground",
  "Early Access": "bg-chart-4 text-primary-foreground",
  "Coming Soon": "bg-primary text-primary-foreground",
  "In Development": "bg-neon-purple text-primary-foreground",
};

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link
        to="/games/$gameId"
        params={{ gameId: game.id }}
        className="group block overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-primary/50 hover:glow-neon"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={game.cover}
            alt={game.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <span
            className={`absolute left-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColors[game.status]}`}
          >
            {game.status}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{game.genre}</p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {game.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
