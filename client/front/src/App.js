import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Messenger from './pages/Messenger/Messenger';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Modaladdmessage from './components/Modal/Modaladdmessage';
import { persistor,store } from './Redux/Store';
function App() {
    //const { account } = useContext(AuthContext);
    return (
<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
        </Provider>
       
    );
};

export default App;