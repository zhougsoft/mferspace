-- Create & seeds the 'profiles' table with 10,020 empty mfer records
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  mfer_id INT PRIMARY KEY,
  name VARCHAR(50),
  tagline VARCHAR(140),
  pronouns VARCHAR(50),
  age VARCHAR(25),
  location VARCHAR(100),
  link_1 VARCHAR(50),
  link_2 VARCHAR(50),
  link_3 VARCHAR(50),
  last_updated TIMESTAMP
);

-- Seed with empty records for each existing mfer (ids 0 to 10020)
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
  nonce int4 NOT NULL
);

CREATE INDEX ON wallets (address);