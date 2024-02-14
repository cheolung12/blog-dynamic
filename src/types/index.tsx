import { Database } from "./supabase";

export type Post = Database["public"]["Tables"]["Post"]["Row"];
export type PostRequest = Database["public"]["Tables"]["Post"]["Insert"];
