export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          event_type: string;
          event_date: string;
          guest_count: number;
          location: string;
          package: string | null;
          message: string | null;
          status: BookingStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          event_type: string;
          event_date: string;
          guest_count: number;
          location: string;
          package?: string | null;
          message?: string | null;
          status?: BookingStatus;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["contact_messages"]["Insert"]
        >;
        Relationships: [];
      };
      gallery_images: {
        Row: {
          id: string;
          url: string;
          storage_path: string;
          caption: string | null;
          category: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          storage_path: string;
          caption?: string | null;
          category: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["gallery_images"]["Insert"]
        >;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type ContactMessage =
  Database["public"]["Tables"]["contact_messages"]["Row"];
export type GalleryImage = Database["public"]["Tables"]["gallery_images"]["Row"];
