import React, { useEffect, useState } from "react";
import { Checkbox, Modal, Button } from "semantic-ui-react";
import {
  getCurrentUserPlaylist,
  getSongsInsideCurrentUserPlaylist,
} from "../../api/spotify/Spotify";
import { createYouTubePlaylist } from "../../api/youtube/YouTube";

const SelectSpotifyPlaylist = () => {
  const [playList, setPlaylist] = useState([]);
  const [songsInsidePlaylist, setSongsInsidePlaylist] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  //fetch spotify playlist data as soon as the page loads
  useEffect(() => {
    let playListResult = [];
    const fetchData = async () => {
      const data = await getCurrentUserPlaylist();
      const items = data.data.items;
      items.forEach((item) => {
        playListResult.push([item.name, item.id]);
      });
      setPlaylist(playListResult);
      setCheckedState(new Array(playListResult.length).fill(false));
    };
    fetchData();
  }, []);

  //when user checks a playlist handle the change here
  const handleCheckedStateChange = (selectedCheckedBoxIndex) => {
    const updatedCheckedState = checkedState.map((state, index) => {
      return index === selectedCheckedBoxIndex ? !state : state;
    });
    setCheckedState(updatedCheckedState);
  };

  //lets the user click on the select all button and select all the checkbox

  const handleSelectAll = () => {
    const updatedCheckedState = checkedState.map((state) => {
      return (state = true);
    });
    setCheckedState(updatedCheckedState);
  };

  //this is where the playlist will be exported to youtube
  //calls the youtube api to create a playlis and export all songs
  //to the newly created playlist
  const handleExportToYoutube = async () => {
    let songsInsidePlaylistObject = [];
    playList.forEach(async (item, index) => {
      if (checkedState[index] === true) {
        let songsInsidePlaylistTemp = [];
        //This will create a new playlist in youtube with same name as spotify playlist
        // const res = await createYouTubePlaylist(item);
        //This will get all songs inside the current spotify playlist
        const playlistData = await getSongsInsideCurrentUserPlaylist(item[1]);
        const playlistDataArray = playlistData.data.items; 
        playlistDataArray.forEach((singleTrack) => {
          songsInsidePlaylistTemp.push(singleTrack.track.name);
        });
        songsInsidePlaylistObject.push({
          playlistName : item[0],
          songs : songsInsidePlaylistTemp,
        });
      }
    });
    setSongsInsidePlaylist([...songsInsidePlaylist, songsInsidePlaylistObject]);
    console.log(songsInsidePlaylist);
    //Now i have to serach for all songs inside the playlist using youtbe api
    //and insert it into the newly created playlist in youtube.
    
  };

  return (
    <div className="selectSpotifyPlaylist">
      <h1>Select Playlist</h1>
      <ul>
        {playList.map((item, index) => {
          return (
            <div>
              <Checkbox
                key={index}
                checked={checkedState[index]}
                label={<label>{item[0]}</label>}
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
        <Button onClick={handleExportToYoutube}>
          Export selected playlists to YouTube
        </Button>
      </div>
    </div>
  );
};

export default SelectSpotifyPlaylist;
