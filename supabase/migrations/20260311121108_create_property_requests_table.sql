/*
  # Create Property Requests Table
  
  ## Overview
  This migration creates a table to store property requests from both buyers (Alım) and sellers (Satım).
  
  ## Tables Created
  - `property_requests`: Stores all buyer and seller property requests
  
  ## Columns
  - `id`: UUID primary key
  - `request_type`: 'buy' or 'sell' (Alım or Satım)
  - `property_type`: 'residential' or 'land' (Konut or Arazi)
  - `property_subtype`: Specific type (e.g., Daire, Ev, Tarla)
  - `room_count`: Number of rooms (for residential)
  - `square_meters`: Property size
  - `location`: Property location
  - `description`: Additional details
  - `full_name`: Contact person name
  - `phone`: Contact phone number
  - `whatsapp`: Optional WhatsApp number
  - `created_at`: Timestamp
  
  ## Security
  - Row Level Security enabled
  - Public insert access for form submissions
  - Authenticated read access for staff
*/

CREATE TABLE IF NOT EXISTS property_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL CHECK (request_type IN ('buy', 'sell')),
  property_type text NOT NULL CHECK (property_type IN ('residential', 'land')),
  property_subtype text NOT NULL,
  room_count integer,
  square_meters integer,
  location text NOT NULL,
  description text,
  full_name text NOT NULL,
  phone text NOT NULL,
  whatsapp text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE property_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for form submissions"
  ON property_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read requests"
  ON property_requests
  FOR SELECT
  TO authenticated
  USING (true);
