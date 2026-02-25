import express from "express";
const app = express();
export default app;

// import routers from api
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";

// use json body parser
app.use(express.json());

// invoke the routers
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

// postgres error handlers to send better error messages
app.use((err,req,res,next)=>{
  // unique constraint violation
  if(err.code === "23505") {
    return res.status(400).send(err.detail);
  }

  next(err);
});

// 500 error handler
app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).send("Fatal error!");
})