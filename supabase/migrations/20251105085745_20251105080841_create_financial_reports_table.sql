/*
  # Create Financial Reports Table

  ## Overview
  This migration creates the financial_reports table to track all financial transactions
  for the Mahallu community including income, expenses, and donations.

  ## Tables Created
  1. **financial_reports**
     - `id` (uuid, primary key) - Unique identifier for each financial entry
     - `date` (date) - Transaction date
     - `description` (text) - Description of the transaction
     - `amount` (numeric) - Transaction amount in INR
     - `category` (text) - Type: income, expense, or donation
     - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enables Row Level Security (RLS) on financial_reports table
  - Policy: Authenticated users can view all financial records (read-only for transparency)
  - Future: Add admin policies for insert/update/delete operations

  ## Notes
  - All amounts are stored in INR (Indian Rupees)
  - Category field validates against: income, expense, donation
  - Financial transparency is key for community trust
*/

-- Create financial_reports table
CREATE TABLE IF NOT EXISTS financial_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  description text NOT NULL,
  amount numeric(10,2) NOT NULL CHECK (amount >= 0),
  category text NOT NULL CHECK (category IN ('income', 'expense', 'donation')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can view financial records
CREATE POLICY "Anyone can view financial records"
  ON financial_reports
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster queries by date and category
CREATE INDEX IF NOT EXISTS idx_financial_reports_date ON financial_reports(date DESC);
CREATE INDEX IF NOT EXISTS idx_financial_reports_category ON financial_reports(category);