import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import SelectSpotifyPlaylist from "./components/spotifyToYoutube/SelectSpotifyPlaylist";
import HomePage from './components/home/HomePage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/spotify" element={<SelectSpotifyPlaylist />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
