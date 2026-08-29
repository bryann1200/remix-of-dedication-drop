import type { Dedication } from "./dedications";

/**
 * Local sample data for previewing the full slide sequence and motion
 * timing without touching the real dedications table. Used only when
 * mock mode is active (the ?mock URL param or the preview button).
 */
export const mockDedications: Dedication[] = [
  {
    teacher_name: "Mr. Tan",
    from_name: "Sec 3 Amethyst",
    message:
      "Thank you for staying back every Thursday to help us with chemistry — and for pretending not to notice when we laughed at your periodic table jokes. You made the hard stuff feel possible.",
    song_title: "Hall of Fame",
    song_artist: "The Script ft. will.i.am",
    audio_path: null,
    created_at: "2026-08-20T09:00:00+08:00",
  },
  {
    teacher_name: "Mdm. Nurul",
    from_name: "Sec 2 Topaz",
    message:
      "For the teacher who believed in us before we believed in ourselves. Your patience turned our chaos into confidence. This one's for you.",
    song_title: "Count on Me",
    song_artist: "Bruno Mars",
    audio_path: null,
    created_at: "2026-08-21T09:00:00+08:00",
  },
  {
    teacher_name: "Ms. Devi",
    from_name: "Sec 4 Emerald",
    message:
      "Four years, a hundred essays, and one unforgettable teacher. Thank you for teaching us that words matter — and that we matter too.",
    song_title: "A Million Dreams",
    song_artist: null,
    audio_path: null,
    created_at: "2026-08-22T09:00:00+08:00",
  },
];
