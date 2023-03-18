import React from "react";
import { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import {
  getAllYoutubePlaylist,
  getAllSongsInsidePlaylist,
} from "../../utils/YoutubeAPICalls";
import {
  getUserIdAndCreatePlaylist,
  insertSongInPlaylist,
  searchForSongIdAndCreateSongURI,
} from "../../utils/SpotifyAPICalls";
import SinglePlaylistCard from "../playlistCard/SinglePlaylistCard";
// import { Pagination } from "semantic-ui-react";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectYouTubePlaylist = () => {
  const [playList, setPlaylist] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [state, setState] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width,setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
    const fetchData = async () => {
      setLoading(true);
      console.log("here");
      const playlists = await getAllYoutubePlaylist();
      setPlaylist(playlists);
      setCheckedState(new Array(playlists.length).fill(false));
      const totalSize = Math.ceil(playlists.length / 3);
      console.log(totalSize);
      let currIndex = 0;
      let tempData = [];
      for (let i = 0; i < totalSize; ++i) {
        let j = currIndex;
        let currTempData = [];
        while (j < playlists.length) {
          currTempData.push(playlists[j]);
          if ((j + 1) % 3 == 0) {
            currIndex = j + 1;
            break;
          }
          j++;
        }
        tempData.push({
          index: i,
          data: currTempData,
        });
      }
      setState(tempData);
      setCurrState(tempData[0]);
      setLoading(false);
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
          const songsInYotubePlaylist = await getAllSongsInsidePlaylist(
            playList[index].playlistId
          );
          const createdSpotifyPlaylistData = await getUserIdAndCreatePlaylist(
            playList[index].playlistName
          );
          const createdSpotifyPlaylistId = createdSpotifyPlaylistData.data.id;
          const songURIArray = await searchForSongIdAndCreateSongURI(
            songsInYotubePlaylist
          );
          await insertSongInPlaylist(songURIArray, createdSpotifyPlaylistId);
        }
      })
    );
  };
  const handlePageChange = (index) => {
    console.log(index)
    setCurrState(state[index]);
  };
  return (
    <div className="selectYoutubePlaylist">
      <h1 className="playlistHeading">Select Playlist</h1>
      {!loading && (
        <>
          <Card.Group itemsPerRow={3}>
            {currState.data.map((item, index) => {
              return (
                <SinglePlaylistCard
                  key={index}
                  playlistName={item.playlistName}
                  imageUrl={item.imageUrl}
                  handleCheckedStateChange={handleCheckedStateChange}
                  index={index}
                  checkedState={checkedState[index]}
                />
              );
            })}
          </Card.Group>
          <Pagination className="lg pagination"
          >
            {state.map((_, index) => {
              return (
                <Pagination.Item
                  onClick={() => handlePageChange(index)}
                  key={index}
                  active={index == state.index}
                >
                  {index + 1}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </>
      )}
      <div className="exportButtons">
        <div>
          <button
            type="button"
            onClick={handleSelectAll}
            class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Select all
          </button>
        </div>
        {/* TODO: add a modal here */}
        <div>
          <button
            type="button"
            onClick={handleExport}
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Export To Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectYouTubePlaylist;
