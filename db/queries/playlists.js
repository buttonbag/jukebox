import db from "#db/client";

export async function createPlaylist(name, description) {
  const sql = `
  INSERT INTO playlists
    (name, description)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}


// GET /playlists sends array of all playlists
export async function getPlaylists() {
  const sql = `
  SELECT *
  FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

// POST /playlists creates a new empty playlist
export async function getCreatePlaylist(name, description) {
  const sql = `
  INSERT INTO playlists (name, description)
  VALUES ($1, $2)
  RETURNING *
  `;
  const { rows: [playlist] } = await db.query(sql, [name, description]);
  return playlist;
}


// GET /playlists/:id sends playlist specified by id
export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id=$1
  `;
  const { rows: [playlist] } = await db.query(sql, [id]);
  return playlist;
}