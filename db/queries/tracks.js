import db from "#db/client";

export async function createTrack(name, durationMs) {
  const sql = `
  INSERT INTO tracks
    (name, duration_ms)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [track],
  } = await db.query(sql, [name, durationMs]);
  return track;
}

export async function getTracks() {
  const sql = `
  SELECT *
  FROM tracks
  `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}

export async function getTrackById(id) {
  const sql = `
  SELECT *
  FROM tracks
  WHERE id=$1
  `;
  const { rows: [track] } = await db.query(sql, [id]);
  return track;
}

// GET /playlists/:id/tracks sends all tracks in the playlist
export async function getTracksByPlaylistId(id) {
  const sql = `
  SELECT tracks.*
  FROM tracks
    JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
    JOIN playlists ON playlists.id = playlists_tracks.playlist_id
  WHERE playlists.id=$1
  `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}

    // POST /playlists/:id/tracks adds a new track to the playlist
    //     trackId should be sent in request body
    //     Sends the created playlist_track with status 201
