import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageSquare, Users, Shield } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Metaforce Studio" },
      { name: "description", content: "Join the Metaforce Studio community. Connect with fellow gamers." },
      { property: "og:title", content: "Community — Metaforce Studio" },
      { property: "og:description", content: "Join the Metaforce Studio community." },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-display text-4xl font-black text-foreground">Community Hub</h1>
          <p className="mt-2 text-muted-foreground">Connect, share, and grow with the Metaforce community.</p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: MessageSquare,
                title: "Discord Server",
                desc: "Join thousands of players on our official Discord. Chat, find teammates, and get support.",
                action: "Join Discord",
              },
              {
                icon: Users,
                title: "Forums",
                desc: "Dive deep into game discussions, share strategies, and connect with the dev team.",
                action: "Browse Forums",
              },
              {
                icon: Shield,
                title: "Bug Reports",
                desc: "Help us improve our games by reporting bugs and suggesting new features.",
                action: "Report a Bug",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                className="rounded-lg border border-border/50 bg-card p-6 text-center transition-all hover:border-primary/50"
              >
                <item.icon className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:glow-neon">
                  {item.action}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Latest News placeholder */}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground">Latest Updates</h2>
            <div className="mt-6 space-y-4">
              {[
                { date: "2025-03-15", title: "Neon Strike v1.2 Patch Notes — New weapons and maps!", },
                { date: "2025-03-01", title: "Runefall Legends Early Access — Now Available!", },
                { date: "2025-02-20", title: "Stellar Void Development Update #5 — Alien encounters revealed", },
              ].map((news) => (
                <div key={news.title} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-primary/50">
                  <span className="flex-shrink-0 text-xs text-muted-foreground">{news.date}</span>
                  <h4 className="text-sm font-medium text-foreground">{news.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
