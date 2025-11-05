/*
  # Create Survey Data Table

  ## Overview
  This migration creates the survey_data table to store community
  demographic and socioeconomic survey information by zone.

  ## Tables Created
  1. **survey_data**
     - `id` (uuid, primary key) - Unique identifier for each survey record
     - `total_households` (integer) - Total number of households in zone
     - `unemployed_percentage` (numeric) - Percentage of unemployed youth
     - `poverty_percentage` (numeric) - Percentage of families below poverty line
     - `average_income` (numeric) - Average monthly household income in INR
     - `education_distribution` (jsonb) - JSON object with education levels
     - `zone` (text) - Zone/ward name (e.g., "East Ward", "West Ward")
     - `last_updated` (timestamptz) - When survey data was last updated

  ## Security
  - Enables Row Level Security (RLS) on survey_data table
  - Policy: Authenticated users can view survey data for transparency
  - Future: Add admin policies for updating survey data

  ## Notes
  - Education distribution stored as JSON: {"Primary": 30, "Secondary": 40, ...}
  - Survey data helps identify community needs and plan interventions
  - Zone-based data allows for targeted programs
*/

-- Create survey_data table
CREATE TABLE IF NOT EXISTS survey_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_households integer NOT NULL CHECK (total_households >= 0),
  unemployed_percentage numeric(5,2) NOT NULL CHECK (unemployed_percentage >= 0 AND unemployed_percentage <= 100),
  poverty_percentage numeric(5,2) NOT NULL CHECK (poverty_percentage >= 0 AND poverty_percentage <= 100),
  average_income numeric(10,2) NOT NULL CHECK (average_income >= 0),
  education_distribution jsonb NOT NULL DEFAULT '{}',
  zone text NOT NULL,
  last_updated timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE survey_data ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can view survey data
CREATE POLICY "Authenticated users can view survey data"
  ON survey_data
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for zone queries
CREATE INDEX IF NOT EXISTS idx_survey_data_zone ON survey_data(zone);