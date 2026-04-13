import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Gamepad2, Zap, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { getAllGames } from "@/lib/games-service";
import { GameCard } from "@/components/GameCard";
import type { Game } from "@/lib/games-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Metaforce Studio — Next-Gen Gaming" },
      { name: "description", content: "Pushing the boundaries of interactive entertainment. Explore our games, merch, and community." },
      { property: "og:title", content: "Metaforce Studio — Next-Gen Gaming" },
      { property: "og:description", content: "Pushing the boundaries of interactive entertainment." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => { getAllGames().then(setGames); }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Welcome to the future
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 font-display text-5xl font-black uppercase tracking-tight sm:text-7xl lg:text-8xl"
          >
            <span className="text-foreground">META</span>
            <span className="gradient-neon-text">FORCE</span>
            <br />
            <span className="text-foreground">STUDIO</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Pushing the boundaries of interactive entertainment. We build worlds worth exploring, stories worth telling, and experiences worth remembering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              to="/games"
              className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:glow-neon"
            >
              Explore Games
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/store"
              className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Visit Store
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-border/50 px-4 py-10">
          {[
            { icon: Gamepad2, value: "4+", label: "Games" },
            { icon: Globe, value: "50K+", label: "Players" },
            { icon: Zap, value: "2025", label: "Founded" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 px-4 text-center">
              <stat.icon className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Games */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Portfolio</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">Featured Games</h2>
          </div>
          <Link to="/games" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-card/50">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Ready to <span className="gradient-neon-text">Join the Force</span>?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Be part of our growing community. Get early access to new releases, exclusive merch, and behind-the-scenes content.
          </p>
          <Link
            to="/community"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:glow-neon"
          >
            Join Community
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
