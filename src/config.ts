/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║          WEDDING INVITATION — CUSTOMIZATION FILE             ║
 * ║   Edit the values below to personalise your invitation.      ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * PHOTOS:  Place your image files inside the /public/photos/ folder,
 *          then update the URLs below using the path  /photos/filename.jpg
 *          Example:  "/photos/hero/hero-1.jpg"
 *
 * MUSIC:   Place your music file at  /public/music/wedding-music.mp3
 */

// ─────────────────────────── COUPLE ──────────────────────────────
export const GROOM_FIRST  = "Mr. Than Tun Aung";
export const BRIDE_FIRST  = "Ms. Aye Kyi Kyi Ko";

// ──────────────────────── WEDDING DATE ───────────────────────────
export const DATE_DISPLAY  = "May 30, 2026";             // hero pill
export const DATE_SHORT    = "30.05.26";                  // compact
export const DATE_FULL     = "May 30, 2026";              // venue section
export const ARRIVAL_TIME  = "10:00 AM – 1:00 PM";
export const RSVP_DEADLINE = "May 25, 2026";

/**
 * Countdown target — the exact start of the wedding.
 * Format: 'YYYY-MM-DDTHH:mm:ss+06:30'  (Myanmar Standard Time = UTC+6:30)
 * Update this if the date/month changes.
 */
export const WEDDING_DATE = new Date('2026-05-30T10:00:00+06:30');

// ──────────────────────────── VENUE ──────────────────────────────
export const VENUE_NAME = "Ashin Uttamasara Monastery";
export const VENUE_PLUS_CODE = "R46M+63W";
export const VENUE_LOCATION = "Kyun Taw Rd, Sanchaung";
export const VENUE_ADDRESS = "R46M+63W, Kyun Taw Rd, Yangon, Myanmar";
export const VENUE_DESCRIPTION =
  "A sacred and joyful gathering at Ashin Uttamasara Monastery on Kyun Taw Road, Sanchaung, Yangon.";

// Google Maps — https://maps.app.goo.gl/AvhdrSucf19PF3oX7 (R46M+63W, Kyun Taw Rd)
export const VENUE_MAPS_URL = "https://maps.app.goo.gl/AvhdrSucf19PF3oX7";
/** Used for embedded map search — matches your Plus Code pin */
export const VENUE_MAP_QUERY = "R46M+63W, Kyun Taw Rd, Yangon, Myanmar";
/** Map center (R46M+63W area on Kyun Taw Rd — not the old R46M+754 pin) */
export const VENUE_LAT = 16.8087;
export const VENUE_LNG = 96.1315;

// ─────────────────────────── PARENTS ─────────────────────────────
// Groom's side
export const GROOM_FATHER = "Mr. Han Tun";
export const GROOM_MOTHER = "Mrs. Hla Wine";
// Bride's side
export const BRIDE_FATHER = "Mr. Aye Ko Ko";
export const BRIDE_MOTHER = "Mrs. Hla Hla Htwe";

// ──────────────────────────── MUSIC ──────────────────────────────
// Place your MP3 file in  public/music/  and update the path below.
// The current CDN fallback works without a local file.
export const MUSIC_URL = "/music/wedding-music.mp3";
// Fallback if no local file exists:
export const MUSIC_FALLBACK_URL = "https://cdn.pixabay.com/audio/2022/10/16/audio_2cf67d4554.mp3";

// ══════════════════════════════════════════════════════════════════
//  PHOTOS
//  ─────
//  To use your own photos:
//    1. Copy hero images into     /public/photos/hero/
//    2. Copy gallery images into  /public/photos/gallery/
//    3. Replace the placeholder URLs below.
//  Supported formats: JPG, PNG, WebP
// ══════════════════════════════════════════════════════════════════

// ─────────────── HERO PHOTOS  (3 wide/landscape images) ──────────
export const HERO_PHOTOS: string[] = [
  "/photos/hero/hero-1.jpg", // ← replace: "/photos/hero/hero-1.jpg"
  "/photos/hero/hero-2.jpg", // ← replace: "/photos/hero/hero-2.jpg"
  "/photos/hero/hero-3.jpg", // ← replace: "/photos/hero/hero-3.jpg"
];

// ─────────────── GALLERY PHOTOS  (add as many as you like) ───────
//   portrait: true  → tall / vertical image  (great for portrait shots)
//   portrait: false → square / horizontal image
export interface GalleryPhoto {
  url: string;
  portrait: boolean;
  alt: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { url: "/photos/gallery/gallery-1.jpg", portrait: true,  alt: "Couple photo 1"  }, // ← "/photos/gallery/gallery-1.jpg"
  { url: "/photos/gallery/gallery-2.jpg", portrait: false, alt: "Couple photo 2"  },
  { url: "/photos/gallery/gallery-3.jpg", portrait: true,  alt: "Couple photo 3"  },
  { url: "/photos/gallery/gallery-4.jpg", portrait: false, alt: "Couple photo 4"  },
  { url: "/photos/gallery/gallery-5.jpg", portrait: true,  alt: "Couple photo 5"  },
  { url: "/photos/gallery/gallery-6.jpg", portrait: false, alt: "Couple photo 6"  },
  { url: "/photos/gallery/gallery-7.jpg", portrait: true,  alt: "Couple photo 7"  },
  { url: "/photos/gallery/gallery-8.jpg", portrait: false, alt: "Couple photo 8"  },
  { url: "/photos/gallery/gallery-9.jpg", portrait: true,  alt: "Couple photo 9"  },
  { url: "/photos/gallery/gallery-10.jpg",  portrait: false, alt: "Couple photo 10" },
  { url: "/photos/gallery/gallery-11.jpg",  portrait: true,  alt: "Couple photo 11" },
  { url: "/photos/gallery/gallery-12.jpg",  portrait: false, alt: "Couple photo 12" },
];
