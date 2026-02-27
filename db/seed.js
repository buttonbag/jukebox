import db from "#db/client";
import { faker } from "@faker-js/faker";


import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";

// TODO
async function seed() {
  // connect to database
  await db.connect();
  
  // create 20 tracks 
  for (let i = 1; i <= 20; i++) {
    await createTrack( faker.music.songName(), faker.number.int({ max: 40000 }) );
  }
  
  // create 10 playlists
  for (let i = 1; i <= 10; i++) {
    await createPlaylist( faker.music.album(),  faker.lorem.sentence({ min: 3, max: 5 }));
  }  
  // seed the database with at least 15 playlists_tracks 
  // some of the seeded tracks belong to some of the seeded playlists.
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 3);
    await createPlaylistTrack(playlistId, i);
  }
  
  console.log("🌱 Database seeded.");
  
  await db.end();
}

seed();