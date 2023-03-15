import {
  getSpotifyUserId,
  createSpotifyPlaylist,
  searchSpotifyForSong,
  insertSongInSpotifyPlaylist,
} from "../api/spotify/Spotify";

const getUserIdAndCreatePlaylist = async (playlistName) => {
  //get the user id
  const data = await getSpotifyUserId();
  const userId = data.data.id;

  //create playlist
  const res = await createSpotifyPlaylist(userId, playlistName);
  return res;
};

//create a song Uri array
const searchForSongIdAndCreateSongURI = async (songs) => {
  let arr = [];

  await Promise.all(
    songs.map(async (song) => {
      const data = await searchSpotifyForSong(song);
      const songId = data.data.tracks.items[0].id;
      // console.log(songId);
      arr.push(`spotify:track:${songId}`);
    })
  );
  return arr;
};

//insert song in playlist using song uris

const insertSongInPlaylist = async (songURIArray, playlistId) => {
  if (songURIArray.length <= 100) {
    const res = await insertSongInSpotifyPlaylist(playlistId, songURIArray);
    console.log(res);
  } else {
    let start = 0,
      end = 100;
    while (end < songURIArray.length) {
      const tempSongUriArray = songURIArray.slice(start, end);
      const res = await insertSongInSpotifyPlaylist(
        playlistId,
        tempSongUriArray
      );
      console.log(res);
      start = end;
      if (end + 100 > songURIArray.length) {
        end = songURIArray.length + 1;
      } else {
        end = end + 100;
      }
    }
    const tempSongUriArray = songURIArray.slice(start, end);
    const res = await insertSongInSpotifyPlaylist(playlistId, tempSongUriArray);
    console.log(res);
  }
};

export {
  getUserIdAndCreatePlaylist,
  searchForSongIdAndCreateSongURI,
  insertSongInPlaylist,
};
