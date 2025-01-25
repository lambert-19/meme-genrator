
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import MemeGallery from './Components/MemeGallery';
import MemeEditor from './Components/MemeEditor';
import Header from './Components/Header';
function App() {
  

  return (
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<MemeEditor />} />
      <Route path="/gallery" element={<MemeGallery />} />
    </Routes>
  </Router>
  );
}

export default App
