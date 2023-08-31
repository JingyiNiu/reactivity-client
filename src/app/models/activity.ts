import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  address: string;
  hostUsername?: string;
  isCancelled?: boolean;
  attendees?: Profile[];
}
