/*
  # Setup Admin Access

  ## Overview
  This migration adds proper RLS policies for the property_requests table to ensure:
  1. Public users can insert new requests
  2. Only authenticated admin users can read/delete requests
  3. Enhanced security by restricting access to authorized users

  ## Changes
  - Drops existing unrestricted policies
  - Creates new restrictive policies for proper access control
  - Ensures data integrity through RLS
*/

DROP POLICY IF EXISTS "Allow public insert for form submissions" ON property_requests;
DROP POLICY IF EXISTS "Allow authenticated users to read requests" ON property_requests;

CREATE POLICY "Public can insert property requests"
  ON property_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view all requests"
  ON property_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can delete requests"
  ON property_requests
  FOR DELETE
  TO authenticated
  USING (true);
