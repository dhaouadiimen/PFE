import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Messenger from './pages/Messenger/Messenger';
import { useContext } from "react";
import 'react-notifications/lib/notifications.css';
import { AuthContext } from "./context/AuthContext";
import Modaladdmessage from './components/Modal/Modaladdmessage';
function App() {
    //const { account } = useContext(AuthContext);
    return (
         <
        BrowserRouter >
        <
        Routes >
        <
        Route path = "/"
        element = { <Messenger/> }
        /> <
        /Routes> <
        /BrowserRouter>
       
    );
};

export default App;