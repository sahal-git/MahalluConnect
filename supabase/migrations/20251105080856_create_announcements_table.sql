/*
  # Create Announcements Table

  ## Overview
  This migration creates the announcements table to manage community
  announcements, events, notices, and obituaries.

  ## Tables Created
  1. **announcements**
     - `id` (uuid, primary key) - Unique identifier for each announcement
     - `title` (text) - Announcement title
     - `type` (text) - Type: event, notice, or obituary
     - `description` (text) - Detailed description
     - `date` (date) - Event/announcement date
     - `location` (text, optional) - Location if applicable
     - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enables Row Level Security (RLS) on announcements table
  - Policy: Anyone can view all announcements for community awareness
  - Future: Add admin policies for creating/updating announcements

  ## Notes
  - Used for community meetings, charity drives, obituaries, etc.
  - Location field is optional (not all announcements need a location)
  - Sorted by date to show most recent first
*/

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('event', 'notice', 'obituary')),
  description text NOT NULL,
  date date NOT NULL,
  location text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view announcements
CREATE POLICY "Anyone can view announcements"
  ON announcements
  FOR SELECT
  USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_announcements_date ON announcements(date DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_type ON announcements(type);