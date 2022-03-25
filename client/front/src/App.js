import './App.css';
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
import Messenger from './pages/Messenger/Messenger';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messenger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
