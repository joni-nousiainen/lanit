CREATE SEQUENCE IF NOT EXISTS id_sequence
  INCREMENT BY 1
  START WITH 16598;

CREATE TABLE IF NOT EXISTS parties (
  id INTEGER PRIMARY KEY DEFAULT nextval('id_sequence'),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gamers (
  id INTEGER PRIMARY KEY DEFAULT nextval('id_sequence'),
  name TEXT NOT NULL,
  party_id INTEGER NOT NULL REFERENCES parties(id),
  CONSTRAINT gamers_name_party_id_unique UNIQUE (name, party_id)
);

CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY DEFAULT nextval('id_sequence'),
  name TEXT NOT NULL,
  party_id INTEGER NOT NULL REFERENCES parties(id),
  CONSTRAINT games_name_party_id_unique UNIQUE (name, party_id)
);

CREATE TABLE IF NOT EXISTS votes (
  gamer_id INTEGER NOT NULL REFERENCES gamers(id),
  game_id INTEGER NOT NULL REFERENCES games(id),
  CONSTRAINT votes_gamer_id_game_id_unique UNIQUE (gamer_id, game_id)
);
