import React from "react";
import { useState, useEffect } from "react";
import { Checkbox, Button } from "semantic-ui-react";
import {
  getAllYoutubePlaylist,
  getAllSongsInsidePlaylist,
} from "../../utils/YoutubeAPICalls";
import {
  getUserIdAndCreatePlaylist,
  insertSongInPlaylist,
  searchForSongIdAndCreateSongURI,
} from "../../utils/SpotifyAPICalls";
import { insertSongInSpotifyPlaylist } from "../../api/spotify/Spotify";

const SelectYouTubePlaylist = () => {
  const [playList, setPlaylist] = useState([]);
  const [songsInsidePlaylist, setSongsInsidePlaylist] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    let songsArray = [];
    let samplePlaylist = [];
    samplePlaylist.push({
      playlistName: "TEST",
      playlistId: "sampleID",
    });
    samplePlaylist.push({
      playlistName: "TEST2",
      playlistId: "sampleID",
    });
    songsArray.push({
      playlistName: "TEST",
      songs: ["Lover", "London Boy"],
    });
    songsArray.push({
      playlistName: "TEST2",
      songs: ["Midnight Rain", "Humma"],
    });
    setPlaylist(samplePlaylist);
    setSongsInsidePlaylist(songsArray);
    // const fetchData = async () => {
    //   const playlists = await getAllYoutubePlaylist();
    //   for(let i=0;i<playlists.length;++i){
    //     const singlePlaylist = playList[i];
    //     const songs = await getAllSongsInsidePlaylist(singlePlaylist.playlistId);
    //     console.log(singlePlaylist.playlistName);
    //     // console.log(songs);
    //     console.log(singlePlaylist.playlistName + " has number of songs = " + songs.length);
    //     songsArray.push({
    //       "playlistName":singlePlaylist.playlistName,
    //       "songs":songs,
    //     });
    //   }
    // playlists.forEach(async (singlePlaylist) => {
    //   const songs = await getAllSongsInsidePlaylist(singlePlaylist.playlistId);
    //   console.log(singlePlaylist.playlistName);
    //   // console.log(songs);
    //   console.log(singlePlaylist.playlistName + " has number of songs = " + songs.length);
    //   songsArray.push({
    //     "playlistName":singlePlaylist.playlistName,
    //     "songs":songs,
    //   });
    // });
    // setSongsInsidePlaylist(songsArray);
    setCheckedState(new Array(songsArray.length).fill(false));
    // };
    // fetchData();
    // console.log(songsInsidePlaylist);
  }, []);

  const handleCheckedStateChange = (selectedCheckedBoxIndex) => {
    const updatedCheckedState = checkedState.map((state, index) => {
      return index === selectedCheckedBoxIndex ? !state : state;
    });
    setCheckedState(updatedCheckedState);
  };

  const handleSelectAll = () => {
    const updatedCheckedState = checkedState.map((state) => {
      return (state = true);
    });
    setCheckedState(updatedCheckedState);
  };

  const handleExport = async () => {
    await Promise.all(checkedState.map(async (state, index) => {
      if (state) {
        //console.log("reached");
        const tempData = await getUserIdAndCreatePlaylist(playList[index].playlistName);
        const createdSpotifyPlaylistId = tempData.data.id;
        const songs = songsInsidePlaylist[index].songs;
        const songURIArray = await searchForSongIdAndCreateSongURI(songs);
        await insertSongInPlaylist(songURIArray,createdSpotifyPlaylistId);
        
      //   if (songURIArray.length <= 100) {
      //     const res = await insertSongInSpotifyPlaylist(createdSpotifyPlaylistId,songURIArray);
      //     console.log(res);
      //   } else {
      //     let start = 0,
      //       end = 100;
      //     while (end < songURIArray.length) {
      //       const tempSongUriArray = songURIArray.slice(start, end);
      //       const res = await insertSongInSpotifyPlaylist(
      //         playList[index].playlistId,
      //         tempSongUriArray.toString()
      //       );
      //       console.log(res);
      //       start = end;
      //       if (end + 100 > songURIArray.length) {
      //         end = songURIArray.length + 1;
      //       } else {
      //         end = end + 100;
      //       }
      //     }
      //     const tempSongUriArray = songURIArray.slice(start, end);
      //     const res = await insertSongInSpotifyPlaylist(
      //       playList[index].playlistId,
      //       tempSongUriArray.toString()
      //     );
      //     console.log(res);
      //   }
      }
    }));
  };

  return (
    <div className="selectYoutubePlaylist">
      <h1>Select Playlist</h1>
      <ul>
        {playList.map((item, index) => {
          return (
            <div>
              <Checkbox
                key={index}
                checked={checkedState[index]}
                label={<label>{item.playlistName}</label>}
                onChange={() => handleCheckedStateChange(index)}
              ></Checkbox>
              <br />
            </div>
          );
        })}
      </ul>
      <Button onClick={handleSelectAll}>Select all</Button>
      {/* TODO: add a modal here */}
      <div>
        {/* <Modal
          trigger={<Button>Export selected playlists to YouTube</Button>}
          header="Export selected playlists"
          content="Are you sure to export selected playlists to YouTube Music."
          actions={["Cancel", { key: "done", content: "Sure", positive: true,]}
        ></Modal> */}
        <Button onClick={handleExport}>
          Export selected playlists to Spotify
        </Button>
      </div>
    </div>
  );
};

export default SelectYouTubePlaylist;
