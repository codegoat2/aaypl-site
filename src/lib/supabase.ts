import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured. Forms will not submit to database.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export type Database = {
  public: {
    Tables: {
      membership_applications: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          country: string
          city: string | null
          date_of_birth: string | null
          occupation: string | null
          organization: string | null
          leadership_role: string | null
          membership_category: string
          areas_of_interest: string[] | null
          statement_of_interest: string
          linkedin_url: string | null
          agreed_to_constitution: boolean
          consented_to_privacy: boolean
          status: 'pending' | 'approved' | 'rejected' | 'under_review'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['membership_applications']['Row'], 'id' | 'created_at' | 'updated_at' | 'status'>
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          country: string | null
          subject: string
          message: string
          status: 'unread' | 'read' | 'replied'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at' | 'status'>
      }
      partnership_inquiries: {
        Row: {
          id: string
          organization_name: string
          country: string
          contact_person: string
          email: string
          organization_type: string
          partnership_interest: string
          message: string
          status: 'pending' | 'in_review' | 'accepted' | 'declined'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['partnership_inquiries']['Row'], 'id' | 'created_at' | 'status'>
      }
    }
  }
}
