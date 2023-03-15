import React, { useEffect } from "react";
import {
  searchYouTubeForSong,
  addSongToYouTubePlaylist,
} from "../../api/youtube/YouTube";

const ExportToYoutube = ({ songsInsidePlaylist }) => {
  useEffect(() => {
    const fecthDataFromYoutube = () => {
      songsInsidePlaylist.forEach((song,index) => {
        const playlistId = song.youtubePlaylistId;
        const songsNameArray = song.songs;
        const playlistName = song.playlistName;
        songsNameArray.forEach(async (currentSong) => {
          const searchResultsFromYoutube = await searchYouTubeForSong(
            currentSong
          );
          const songIdFromYoutube = searchResultsFromYoutube.data.items[0].id.videoId;
          console.log(songIdFromYoutube);
          //use this song id to insert this video into the created youtube playlist
        //   const res = await addSongToYouTubePlaylist(playlistId,songIdFromYoutube);
        //   console.log(res);
        });
      });
    };
    fecthDataFromYoutube();
  }, [songsInsidePlaylist]);

  return <div>Exporting</div>;
};

export default ExportToYoutube;
