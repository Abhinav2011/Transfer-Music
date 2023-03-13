import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './components/home/HomePage';
import SelectSpotifyPlaylist from "./components/spotifyToYoutube/SelectSpotifyPlaylist";
import SelectYouTubePlaylist from './components/youtubeToSpotify.js/SelectYouTubePlaylist';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/spotify" element={<SelectSpotifyPlaylist />}></Route>
          <Route path="/youtube" element={<SelectYouTubePlaylist />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
