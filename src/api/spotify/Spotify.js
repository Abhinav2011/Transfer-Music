import axios from "axios";

const URL = 'https://api.spotify.com/v1';

const getCurrentUserPlaylist = async () => {
    const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");
    const config = {
        headers:{
            "Authorization":`Bearer ${spotifyAccessToken}`,
            "Content-Type": "application/json",
        }
    }
    const playListData = await axios.get(`${URL}/me/playlists`,config);
    return playListData;
}


export {getCurrentUserPlaylist};