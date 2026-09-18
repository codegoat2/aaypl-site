-- AAYPL Website Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────────────────────────────────────────────────────────────
-- MEMBERSHIP APPLICATIONS
-- ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS membership_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2 AND char_length(full_name) <= 200),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT,
  country TEXT NOT NULL,
  city TEXT,
  date_of_birth DATE,
  occupation TEXT,
  organization TEXT,
  leadership_role TEXT,
  membership_category TEXT NOT NULL CHECK (membership_category IN (
    'Founding Member', 'Ordinary Member', 'Associate Member',
    'Honorary Member', 'Institutional / Partner Member'
  )),
  areas_of_interest TEXT[] DEFAULT '{}',
  statement_of_interest TEXT NOT NULL CHECK (char_length(statement_of_interest) >= 50),
  linkedin_url TEXT,
  agreed_to_constitution BOOLEAN NOT NULL DEFAULT FALSE,
  consented_to_privacy BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────
-- CONTACT MESSAGES
-- ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 200),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  country TEXT,
  subject TEXT NOT NULL CHECK (char_length(subject) >= 2 AND char_length(subject) <= 300),
  message TEXT NOT NULL CHECK (char_length(message) >= 10),
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  reply_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────
-- PARTNERSHIP INQUIRIES
-- ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partnership_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_name TEXT NOT NULL CHECK (char_length(organization_name) >= 2 AND char_length(organization_name) <= 300),
  country TEXT NOT NULL,
  contact_person TEXT NOT NULL CHECK (char_length(contact_person) >= 2 AND char_length(contact_person) <= 200),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  organization_type TEXT NOT NULL,
  partnership_interest TEXT NOT NULL,
  message TEXT NOT NULL CHECK (char_length(message) >= 20),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'accepted', 'declined', 'archived')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGER
-- ──────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_membership_applications_updated_at
  BEFORE UPDATE ON membership_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ──────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ──────────────────────────────────────────────────────────────────────
-- Enable RLS on all tables
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT (for form submissions from website)
-- Reads/updates/deletes are restricted to authenticated admin users only

CREATE POLICY "Allow anonymous insert on membership_applications"
  ON membership_applications FOR INSERT
  TO anon
  WITH CHECK (
    agreed_to_constitution = TRUE AND
    consented_to_privacy = TRUE
  );

CREATE POLICY "Allow anonymous insert on contact_messages"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (TRUE);

CREATE POLICY "Allow anonymous insert on partnership_inquiries"
  ON partnership_inquiries FOR INSERT
  TO anon
  WITH CHECK (TRUE);

-- Authenticated users (admin) can read all
CREATE POLICY "Allow authenticated read on membership_applications"
  ON membership_applications FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Allow authenticated read on contact_messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Allow authenticated read on partnership_inquiries"
  ON partnership_inquiries FOR SELECT
  TO authenticated
  USING (TRUE);

-- Authenticated users (admin) can update status
CREATE POLICY "Allow authenticated update on membership_applications"
  ON membership_applications FOR UPDATE
  TO authenticated
  USING (TRUE);

CREATE POLICY "Allow authenticated update on contact_messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (TRUE);

CREATE POLICY "Allow authenticated update on partnership_inquiries"
  ON partnership_inquiries FOR UPDATE
  TO authenticated
  USING (TRUE);

-- ──────────────────────────────────────────────────────────────────────
-- INDEXES FOR PERFORMANCE
-- ──────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_membership_applications_email ON membership_applications(email);
CREATE INDEX IF NOT EXISTS idx_membership_applications_status ON membership_applications(status);
CREATE INDEX IF NOT EXISTS idx_membership_applications_country ON membership_applications(country);
CREATE INDEX IF NOT EXISTS idx_membership_applications_created_at ON membership_applications(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_partnership_inquiries_status ON partnership_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_partnership_inquiries_created_at ON partnership_inquiries(created_at DESC);
