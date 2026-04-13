import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ArrowLeft, Shield, Users, Gamepad2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type GameRow = Database["public"]["Tables"]["games"]["Row"];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Metaforce Studio" },
      { name: "description", content: "Metaforce Studio admin panel." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-16 gap-4">
        <Shield className="h-16 w-16 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
        <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        <Link to="/" className="text-primary hover:underline">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/account" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-4xl font-black text-foreground">Admin Panel</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <AdminNav />
          <AdminContent />
        </div>
      </div>
    </div>
  );
}

function AdminNav() {
  return (
    <nav className="flex flex-row gap-1 lg:flex-col">
      <button className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary">
        <Gamepad2 className="h-4 w-4" /> Games
      </button>
    </nav>
  );
}

function AdminContent() {
  const [games, setGames] = useState<GameRow[]>([]);
  const [editingGame, setEditingGame] = useState<GameRow | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loadingGames, setLoadingGames] = useState(true);

  const fetchGames = async () => {
    setLoadingGames(true);
    const { data } = await supabase.from("games").select("*").order("created_at", { ascending: false });
    setGames(data ?? []);
    setLoadingGames(false);
  };

  useEffect(() => { fetchGames(); }, []);

  const deleteGame = async (id: string) => {
    if (!confirm("Are you sure you want to delete this game?")) return;
    await supabase.from("games").delete().eq("id", id);
    fetchGames();
  };

  if (showForm || editingGame) {
    return (
      <GameForm
        game={editingGame}
        onDone={() => { setShowForm(false); setEditingGame(null); fetchGames(); }}
        onCancel={() => { setShowForm(false); setEditingGame(null); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Manage Games</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:glow-neon"
        >
          <Plus className="h-4 w-4" /> Add Game
        </button>
      </div>

      {loadingGames ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : games.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No games yet. Add your first game!</p>
      ) : (
        <div className="space-y-3">
          {games.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4 rounded-lg border border-border/50 bg-card p-4"
            >
              {game.cover_url && (
                <img src={game.cover_url} alt={game.title} className="h-16 w-12 rounded object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{game.title}</h3>
                <p className="text-xs text-muted-foreground">{game.genre} · {game.status} · /{game.slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingGame(game)} className="rounded border border-border p-2 text-muted-foreground hover:text-primary hover:border-primary/50">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => deleteGame(game.id)} className="rounded border border-border p-2 text-muted-foreground hover:text-destructive hover:border-destructive/50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function GameForm({ game, onDone, onCancel }: { game: GameRow | null; onDone: () => void; onCancel: () => void }) {
  const [title, setTitle] = useState(game?.title ?? "");
  const [slug, setSlug] = useState(game?.slug ?? "");
  const [description, setDescription] = useState(game?.description ?? "");
  const [longDescription, setLongDescription] = useState(game?.long_description ?? "");
  const [genre, setGenre] = useState(game?.genre ?? "");
  const [releaseDate, setReleaseDate] = useState(game?.release_date ?? "");
  const [status, setStatus] = useState(game?.status ?? "In Development");
  const [coverUrl, setCoverUrl] = useState(game?.cover_url ?? "");
  const [features, setFeatures] = useState(game?.features?.join("\n") ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const autoSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const data = {
      title,
      slug: slug || autoSlug(title),
      description: description || null,
      long_description: longDescription || null,
      genre: genre || null,
      release_date: releaseDate || null,
      status,
      cover_url: coverUrl || null,
      features: features.split("\n").map((f) => f.trim()).filter(Boolean),
    };

    let res;
    if (game) {
      res = await supabase.from("games").update(data).eq("id", game.id);
    } else {
      res = await supabase.from("games").insert(data);
    }

    if (res.error) {
      setError(res.error.message);
      setSubmitting(false);
    } else {
      onDone();
    }
  };

  const inputClass = "w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        {game ? "Edit Game" : "Add New Game"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Title *</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value); if (!game) setSlug(autoSlug(e.target.value)); }} required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Cover Image URL</label>
          <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://..." className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Short Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Full Description</label>
          <textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={4} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Genre</label>
            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Action / FPS" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Release Date</label>
            <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
            <option value="Released">Released</option>
            <option value="Early Access">Early Access</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="In Development">In Development</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Features (one per line)</label>
          <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={4} placeholder="Feature 1&#10;Feature 2" className={inputClass} />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={submitting} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:glow-neon disabled:opacity-50">
            {submitting ? "Saving..." : game ? "Update Game" : "Create Game"}
          </button>
          <button type="button" onClick={onCancel} className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
