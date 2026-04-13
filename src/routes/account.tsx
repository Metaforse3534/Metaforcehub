import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { LogOut, Shield, User } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Metaforce Studio" },
      { name: "description", content: "Manage your Metaforce Studio account." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, profile, roles, isAdmin, loading, signIn, signUp, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-black text-foreground">My Account</h1>

          <div className="mt-8 rounded-lg border border-border/50 bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{profile?.display_name || "Player"}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {roles.length > 0 && (
                  <div className="mt-1 flex gap-1.5">
                    {roles.map((role) => (
                      <span key={role} className="inline-flex items-center gap-1 rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        <Shield className="h-3 w-3" />
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {isAdmin && (
            <Link
              to="/admin"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-primary/50 bg-primary/10 p-4 font-semibold text-primary transition hover:bg-primary/20"
            >
              <Shield className="h-5 w-5" />
              Open Admin Panel
            </Link>
          )}

          <button
            onClick={async () => {
              await signOut();
              navigate({ to: "/" });
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/50 p-3 text-sm font-medium text-destructive transition hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function AuthForm() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (mode === "signup") {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Check your email to confirm your account!");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <h1 className="text-center font-display text-3xl font-black text-foreground">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {mode === "login" ? "Sign in to your Metaforce account" : "Join the Metaforce community"}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-chart-3">{success}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground transition hover:glow-neon disabled:opacity-50"
          >
            {submitting ? "..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
            className="font-medium text-primary hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
