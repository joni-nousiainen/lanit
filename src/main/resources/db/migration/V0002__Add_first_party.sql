BEGIN;

INSERT INTO parties (code, name) VALUES ('P7CBDR2WXa', 'Syyslanit 2017');

INSERT INTO gamers (party_id, name) (SELECT id, 'Antti' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO gamers (party_id, name) (SELECT id, 'Joni' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO gamers (party_id, name) (SELECT id, 'Kimba' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO gamers (party_id, name) (SELECT id, 'Miksu' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO gamers (party_id, name) (SELECT id, 'Perttu' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO gamers (party_id, name) (SELECT id, 'Rise' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO gamers (party_id, name) (SELECT id, 'Tero' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO gamers (party_id, name) (SELECT id, 'Visa' FROM parties WHERE code = 'P7CBDR2WXa');

INSERT INTO games (party_id, name) (SELECT id, 'Chivalry' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'Diablo 3' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'Garry''s Mod' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'Left 4 Dead' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'Mount & Blade: Warband' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'Pro Pilkki 2' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'Quake' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'StarCraft 2' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'Soldat' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'Team Fortress 2' FROM parties WHERE code = 'P7CBDR2WXa');
INSERT INTO games (party_id, name) (SELECT id, 'WarCraft 3' FROM parties WHERE code = 'P7CBDR2WXa');

COMMIT;
