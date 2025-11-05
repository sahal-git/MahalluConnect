/*
  # Create Jobs Table

  ## Overview
  This migration creates the jobs table to list employment opportunities
  for community members, primarily focused on Gulf country positions.

  ## Tables Created
  1. **jobs**
     - `id` (uuid, primary key) - Unique identifier for each job posting
     - `title` (text) - Job title/position
     - `location` (text) - City/location of the job
     - `country` (text) - Country where job is located
     - `salary` (text) - Salary information with currency
     - `contact` (text) - WhatsApp contact number
     - `description` (text) - Job description and requirements
     - `posted_date` (timestamptz) - When the job was posted
     - `status` (text) - Job status: active or filled

  ## Security
  - Enables Row Level Security (RLS) on jobs table
  - Policy: Anyone (authenticated or not) can view active jobs
  - Future: Add admin policies for creating/updating job postings

  ## Notes
  - Jobs are primarily for Gulf countries (UAE, Saudi Arabia, Qatar, etc.)
  - Contact numbers are WhatsApp enabled for easy communication
  - Only active jobs are shown to users by default
*/

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  country text NOT NULL,
  salary text NOT NULL,
  contact text NOT NULL,
  description text DEFAULT '',
  posted_date timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'filled'))
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active jobs
CREATE POLICY "Anyone can view active jobs"
  ON jobs
  FOR SELECT
  USING (status = 'active');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON jobs(posted_date DESC);