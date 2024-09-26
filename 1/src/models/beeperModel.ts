export interface Beeper {
  id: string;
  name: string;
  status: "manufactured" | "assembled" | "shipped" | "deployed" | "detonated";
  created_at?: Date;
  exploded_at?: Date | -1;
  longitude?: number | -1;
  latitude?: number | -1;
}
