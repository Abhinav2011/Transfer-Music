import express from "express";
import querystring from "querystring";
import axios from "axios";
import "dotenv/config";
const PORT = 8080;
const app = express();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const YOUTUBE_REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI;

//This is get request to get the code to request for the access token
//from the Spotify API. When user clicks on export, this route will be invoked
//and user will be redirected.
app.get("/spotify/login", (req, res) => {
  const scope = "playlist-read-private";

  const queryParams = querystring.stringify({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

//This is the redirect uri where the code we got from spotify
//will be used for getting the access token.
app.get("/spotify/callback", (req, res) => {
  const code = req.query.code;
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });
        res.redirect(`http://localhost:3000/?${queryParams}`);

      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

//This is the route which will be used to generate a new access token
//when the previous access token expires.
app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/youtube/login", (req, res) => {
  const scope = "https://www.googleapis.com/auth/youtube";

  const queryParams = querystring.stringify({
    client_id: YOUTUBE_CLIENT_ID,
    redirect_uri: YOUTUBE_REDIRECT_URI,
    response_type: "token",
    scope: scope,
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`);
});

// app.get("/youtube/callback",(req,res) => {
//   res.send({

//   })
// });

app.listen(PORT, () => {
  console.log("started backend of the app!!!");
});
