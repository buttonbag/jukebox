import express from "express";
const router = express.Router();
export default router;

import { createPlaylist, getPlaylistById, getPlaylists } from "#db/queries/playlists";

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

// GET /playlists/:id sends playlist specified by id
router.get("/:id", async (req,res)=>{
  const playlist = await getPlaylistById(req.params.id);
  if(!playlist) return res.status(404).send("Playlist not found.");
  res.send(playlist);
});

// GET /playlists/:id/tracks sends all tracks in the playlist
// POST /playlists/:id/tracks adds a new track to the playlist
//     trackId should be sent in request body
//     Sends the created playlist_track with status 201
