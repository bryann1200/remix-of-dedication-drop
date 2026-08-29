import { supabase } from "./supabase";

export type Dedication = {
  teacher_name: string;
  from_name: string;
  message: string;
  song_title: string;
  song_artist: string | null;
  audio_path: string | null;
  created_at: string;
};

export async function fetchDedications(): Promise<Dedication[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("dedications")
    .select(
      "teacher_name, from_name, message, song_title, song_artist, audio_path, created_at",
    )
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as Dedication[];
}
