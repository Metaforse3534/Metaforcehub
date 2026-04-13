import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";
import game4 from "@/assets/game-4.jpg";

export interface Game {
  id: string;
  title: string;
  cover: string;
  description: string;
  genre: string;
  releaseDate: string;
  status: "Released" | "Early Access" | "Coming Soon" | "In Development";
  longDescription: string;
  features: string[];
  screenshots: string[];
}

export const games: Game[] = [
  {
    id: "neon-strike",
    title: "Neon Strike",
    cover: game1,
    description: "A fast-paced cyberpunk action game set in a dystopian megacity. Fight through waves of enemies with futuristic weapons and abilities.",
    genre: "Action / FPS",
    releaseDate: "2025-03-15",
    status: "Released",
    longDescription: "Neon Strike drops you into the heart of Neo-Tokyo 2087, a sprawling megacity controlled by ruthless corporations. As a rogue operative, you must fight your way through neon-drenched streets, corporate towers, and underground bunkers. Utilize a vast arsenal of cybernetic enhancements, plasma weapons, and hacking abilities to dismantle the corporate regime and uncover the truth behind Project Metaforce.",
    features: [
      "30+ hours of campaign gameplay",
      "Dynamic combat with cybernetic abilities",
      "Open-world cyberpunk environment",
      "Online co-op for up to 4 players",
      "Extensive character customization",
    ],
    screenshots: [game1],
  },
  {
    id: "runefall-legends",
    title: "Runefall Legends",
    cover: game2,
    description: "An epic fantasy RPG with deep lore, magical combat, and a vast open world to explore. Forge your destiny among ancient ruins.",
    genre: "RPG / Adventure",
    releaseDate: "2025-06-20",
    status: "Early Access",
    longDescription: "Runefall Legends invites you to explore the mystical realm of Eldoria, where ancient runes hold the power to shape reality itself. As a Runekeeper, you must master the arcane arts, forge alliances with legendary creatures, and unravel a conspiracy that threatens to plunge the world into eternal darkness. With a branching narrative and meaningful choices, every playthrough tells a unique story.",
    features: [
      "Massive open world with 6 distinct biomes",
      "Deep magic system with 100+ spells",
      "Branching storyline with multiple endings",
      "Real-time combat with tactical pause",
      "Crafting and enchantment systems",
    ],
    screenshots: [game2],
  },
  {
    id: "stellar-void",
    title: "Stellar Void",
    cover: game3,
    description: "Explore the infinite cosmos in this space exploration sandbox. Build your fleet, discover alien civilizations, and chart unknown galaxies.",
    genre: "Exploration / Sandbox",
    releaseDate: "2026-01-10",
    status: "Coming Soon",
    longDescription: "Stellar Void puts you at the helm of humanity's first deep-space exploration vessel. Navigate through procedurally generated star systems, encounter alien civilizations both friendly and hostile, and build a fleet capable of surviving the dangers of the void. Mine asteroids, establish colonies, research alien technology, and uncover the mystery of the ancient Architects who built the galaxy's most enigmatic structures.",
    features: [
      "Procedurally generated universe",
      "Ship building and fleet management",
      "Diplomacy with alien civilizations",
      "Resource gathering and base building",
      "Multiplayer galaxy exploration",
    ],
    screenshots: [game3],
  },
  {
    id: "velocity-x",
    title: "Velocity X",
    cover: game4,
    description: "The ultimate futuristic racing experience. Push your limits on neon-lit tracks across the world in anti-gravity vehicles.",
    genre: "Racing / Arcade",
    releaseDate: "2026-08-01",
    status: "In Development",
    longDescription: "Velocity X redefines the racing genre with blistering speeds, anti-gravity mechanics, and tracks that defy physics. Race through neon-soaked cityscapes, across floating platforms above volcanic landscapes, and through crystalline ice caverns at speeds exceeding Mach 3. Customize your vehicle with performance upgrades and visual modifications, then compete against players worldwide.",
    features: [
      "50+ tracks across 12 environments",
      "Anti-gravity racing mechanics",
      "Vehicle customization and upgrades",
      "Online multiplayer with ranked leagues",
      "Dynamic weather and track conditions",
    ],
    screenshots: [game4],
  },
];
