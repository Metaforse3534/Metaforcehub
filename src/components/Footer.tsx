import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
                <span className="text-sm font-black text-primary-foreground">M</span>
              </div>
              <span className="font-display text-lg font-bold text-foreground">METAFORCE</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Pushing the boundaries of interactive entertainment. Building worlds worth exploring.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link>
              <Link to="/games" className="text-sm text-muted-foreground hover:text-primary">Games</Link>
              <Link to="/store" className="text-sm text-muted-foreground hover:text-primary">Store</Link>
              <Link to="/community" className="text-sm text-muted-foreground hover:text-primary">Community</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Company</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">About Us</span>
              <span className="text-sm text-muted-foreground">Careers</span>
              <span className="text-sm text-muted-foreground">Press Kit</span>
              <span className="text-sm text-muted-foreground">Contact</span>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Follow Us</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Twitter / X</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Discord</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">YouTube</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Instagram</a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Metaforce Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
