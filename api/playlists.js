import express from "express";
const router = express.Router();
export default router;

import { createPlaylist, getPlaylistById, getPlaylists } from "#db/queries/playlists";
import { getTrackById, getTracksByPlaylistId } from "#db/queries/tracks";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";

// GET /playlists sends array of all playlists
router.get("/", async (req, res)=>{
  const playlists = await getPlaylists();
  res.send(playlists);
});

// POST /playlists creates a new empty playlist
router.post("/", async (req, res)=>{
  if(!req.body) return res.status(400).send("Request body is required.");
  
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Request body requires: name, description")
  
  const playlists = await createPlaylist(name, description);
  res.status(201).send(playlists);
});

router.param("id", async(req, res, next, id)=>{
  const playlist = await getPlaylistById(id);
  if(!playlist) return res.status(404).send("Playlist not found.");
  req.playlist = playlist;
  next();
});
// GET /playlists/:id sends playlist specified by id
router.get("/:id", (req,res)=>{
  res.send(req.playlist);
});

// GET /playlists/:id/tracks sends all tracks in the playlist
router.get("/:id/tracks", async (req,res)=>{
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});
// POST /playlists/:id/tracks adds a new track to the playlist
//     trackId should be sent in request body
//     Sends the created playlist_track with status 201
router.post("/:id/tracks", async (req,res)=>{
  if(!req.body) return res.status(400).send("Request body required.");

  const {trackId} = req.body;
  if(!trackId) return res.status(400).send("Body missing: trackId.");
  
  const track = await getTrackById(trackId);
  if(!track) return res.status(400).send("Track does not exist.");

  const playlistTracks = await createPlaylistTrack(req.playlist.id, trackId);
  res.status(201).send(playlistTracks);
});