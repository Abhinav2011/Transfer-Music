import React from "react";
import { useState, useEffect } from "react";
import { Checkbox, Button } from "semantic-ui-react";
import {
  getYouTubePlaylist,
  getYouTubePlaylistItems,
} from "../../api/youtube/YouTube";

const SelectYouTubePlaylist = () => {
  const [playList, setPlaylist] = useState([]);
  //   const [playListTracksLink, setplayListTracksLink] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    let playListResult = [];
    const fetchData = async () => {
      const data = await getYouTubePlaylist();
      const playlists = data.data.items;
      playlists.forEach((playlist) => {
        playListResult.push(playlist.snippet.localized.title);
      });
      setPlaylist(playListResult);
      setCheckedState(new Array(playListResult.length).fill(false));
      //   playlists.forEach(async (playlist) => {
      //     const playlistId = playlist.id;
      //     const sample = await getYouTubePlaylistItems(playlistId);
      //     console.log(sample);
      //   });
      // console.log(data.data.items);
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
  return (
    <div className="selectYoutubePlaylist">
      <h1>Select Playlist</h1>
      <ul>
        {playList.map((item, index) => {
          return (
            <div>
              <Checkbox
                key={item}
                checked={checkedState[index]}
                label={<label>{item}</label>}
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
        <Button>Export selected playlists to Spotify</Button>
      </div>
    </div>
  );
};

export default SelectYouTubePlaylist;
