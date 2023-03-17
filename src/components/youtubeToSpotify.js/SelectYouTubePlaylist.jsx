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

const SelectYouTubePlaylist = () => {
  const [playList, setPlaylist] = useState([]);
  const [songsInsidePlaylist, setSongsInsidePlaylist] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    // samplePlaylist.push({
    //   playlistName: "TEST",
    //   playlistId: "sampleID",
    // });
    // samplePlaylist.push({
    //   playlistName: "TEST2",
    //   playlistId: "sampleID",
    // });
    // songsArray.push({
    //   playlistName: "TEST",
    //   songs: ["Lover", "London Boy"],
    // });
    // songsArray.push({
    //   playlistName: "TEST2",
    //   songs: ["Midnight Rain", "Humma"],
    // });
    // setPlaylist(samplePlaylist);
    //setSongsInsidePlaylist(songsArray);
    const fetchData = async () => {
      const playlists = await getAllYoutubePlaylist();
      // let songsArray = [];

      // await Promise.all(playlists.map(async (singlePlaylist) => {
      //   const songs = await getAllSongsInsidePlaylist(singlePlaylist.playlistId);
      //   songsArray.push({
      //     playlistName: singlePlaylist.playlistName,
      //     songs: songs,
      //   });
      // }));
      // console.log(songsArray);
      // setSongsInsidePlaylist(songsArray);
      setPlaylist(playlists);
      setCheckedState(new Array(playlists.length).fill(false));
    };
    fetchData();

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
    await Promise.all(
      checkedState.map(async (state, index) => {
        if (state) {
          const songsInYotubePlaylist = await getAllSongsInsidePlaylist(playList[index].playlistId);
          console.log(songsInYotubePlaylist);
          const createdSpotifyPlaylistData = await getUserIdAndCreatePlaylist(
            playList[index].playlistName
          );
          const createdSpotifyPlaylistId = createdSpotifyPlaylistData.data.id;
          const songURIArray = await searchForSongIdAndCreateSongURI(songsInYotubePlaylist);
          await insertSongInPlaylist(songURIArray, createdSpotifyPlaylistId);
        }
      })
    );
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
