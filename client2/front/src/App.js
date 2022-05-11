import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Messenger from './pages/Messenger/Messenger';
import { persistor,store } from './Redux/Store';
import Websocket from '../../../client2/front/src/websocket';
function App() {
    return (
<Provider store={store}>
    <Websocket></Websocket>
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