-- Create & seed `profiles` table with 10,020 empty profiles
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  mfer_id INT PRIMARY KEY,
  name TEXT,
  tagline TEXT,
  age TEXT,
  pronouns TEXT,
  location TEXT,
  bio_1 TEXT,
  bio_2 TEXT,
  updated_at TIMESTAMPTZ
);

INSERT INTO
  profiles(mfer_id)
SELECT
  x.mfer_id
FROM
  generate_series(0, 10020) AS x(mfer_id);

-- Create wallets table & index addresses
DROP TABLE IF EXISTS wallets;

CREATE TABLE wallets (
  wallet_id SERIAL PRIMARY KEY,
  ADDRESS VARCHAR(42) UNIQUE NOT NULL,
  nonce int4 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE INDEX ON wallets (address);

-- Setup trigger for updating timestamps automatically when records are changed
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Set trigger for profiles
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Set trigger for wallets
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON wallets
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
