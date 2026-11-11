import localFont from "next/font/local";
import {
  Plus_Jakarta_Sans,
  Geist,
  Manrope,
  DM_Sans,
  Space_Grotesk,
  Sora,
  Outfit,
  Instrument_Sans,
  Figtree,
  Onest,
  Schibsted_Grotesk,
  Hanken_Grotesk,
  IBM_Plex_Sans,
  Archivo,
  Instrument_Serif,
  Fraunces,
  Playfair_Display,
  EB_Garamond,
  Newsreader,
  DM_Serif_Display,
  Young_Serif,
  Libre_Caslon_Text,
  Bricolage_Grotesque,
  Syne,
  Unbounded,
  Anton,
  Archivo_Black,
  Bebas_Neue,
  Geist_Mono,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Space_Mono,
  DM_Mono,
  Fragment_Mono,
  Martian_Mono,
} from "next/font/google";

const uiSans = localFont({
  src: "../fonts/ui-sans.woff2",
  variable: "--font-ui-sans",
  weight: "100 900",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: false,
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: false,
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  preload: false,
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  preload: false,
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
  preload: false,
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted-grotesk",
  display: "swap",
  preload: false,
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
  preload: false,
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  preload: false,
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
  preload: false,
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
  preload: false,
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  display: "swap",
  preload: false,
});

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-young-serif",
  display: "swap",
  preload: false,
});

const libreCaslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-caslon-text",
  display: "swap",
  preload: false,
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
  preload: false,
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  preload: false,
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  preload: false,
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
  preload: false,
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
  display: "swap",
  preload: false,
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  preload: false,
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
  preload: false,
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
  preload: false,
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fragment-mono",
  display: "swap",
  preload: false,
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  uiSans.variable,
  plusJakartaSans.variable,
  geist.variable,
  manrope.variable,
  dmSans.variable,
  spaceGrotesk.variable,
  sora.variable,
  outfit.variable,
  instrumentSans.variable,
  figtree.variable,
  onest.variable,
  schibstedGrotesk.variable,
  hankenGrotesk.variable,
  ibmPlexSans.variable,
  archivo.variable,
  instrumentSerif.variable,
  fraunces.variable,
  playfairDisplay.variable,
  ebGaramond.variable,
  newsreader.variable,
  dmSerifDisplay.variable,
  youngSerif.variable,
  libreCaslonText.variable,
  bricolageGrotesque.variable,
  syne.variable,
  unbounded.variable,
  anton.variable,
  archivoBlack.variable,
  bebasNeue.variable,
  geistMono.variable,
  jetbrainsMono.variable,
  ibmPlexMono.variable,
  spaceMono.variable,
  dmMono.variable,
  fragmentMono.variable,
  martianMono.variable,
].join(" ");
