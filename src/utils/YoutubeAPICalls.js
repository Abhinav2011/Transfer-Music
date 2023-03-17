import {
  getYouTubePlaylist,
  getYouTubePlaylistItems,
} from "../api/youtube/YouTube";

const getAllYoutubePlaylist = async () => {
  let nextPageTokenValue;
  let playlistData = [];
  while (true) {
    const currData = await getYouTubePlaylist(nextPageTokenValue);
    nextPageTokenValue = currData.data.nextPageToken;
    const playlists = currData.data.items;
    // eslint-disable-next-line no-loop-func
    playlists.forEach((data) => {
      const playlistName = data.snippet.localized.title;
      const playlistId = data.id;
      playlistData.push({
        playlistName: playlistName,
        playlistId: playlistId,
      });
    });
    if (nextPageTokenValue === undefined) {
      break;
    }
  }
  return playlistData;
};

const getAllSongsInsidePlaylist = async (playlistId) => {
  let nextPageTokenValue;
  let playlistSongData = [];

  while (true) {
    const currData = await getYouTubePlaylistItems(playlistId,nextPageTokenValue);
    nextPageTokenValue = currData.data.nextPageToken;
    console.log(nextPageTokenValue);
    const itemsArray = currData.data.items;
    itemsArray.forEach((singleItem) => {
      playlistSongData.push(singleItem.snippet.title);
    });
    if (nextPageTokenValue === null || nextPageTokenValue === undefined) {
      break;
    }

  }
  return playlistSongData;
};

export { getAllYoutubePlaylist, getAllSongsInsidePlaylist };
