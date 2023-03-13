import React, { useEffect, useState } from "react";
import { Checkbox, Modal, Button } from "semantic-ui-react";
import {getCurrentUserPlaylist} from "../../api/spotify/Spotify";

const SelectSpotifyPlaylist = () => {
  const [playList, setPlaylist] = useState([]);
  const [playListTracksLink, setplayListTracksLink] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  useEffect(() => {
    let playListResult = [];
    let playListTracksLinkResult = [];
    const fetchData = async () => {
      const data = await getCurrentUserPlaylist();
      const items = data.data.items;
      items.forEach((item) => {
        playListResult.push(item.name);
        playListTracksLinkResult.push(item.tracks.href);
      });
      setPlaylist(playListResult);
      setplayListTracksLink(playListTracksLinkResult);
      setCheckedState(new Array(playListResult.length).fill(false));
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
    <div className="selectPlaylist">
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
        <Button>Export selected playlists to YouTube</Button>
      </div>
    </div>
  );
};

export default SelectSpotifyPlaylist;
