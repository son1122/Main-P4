import "./Navbar.css";
import Body from "./Body";
import './MainApp.css'
import Navbar from "./nav";
import {Route, Routes} from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import {useEffect, useState} from "react";

const MainApp = (props) => {
    const [view, setView] = useState(1)
    useEffect(() => {
        setView(JSON.parse(window.localStorage.getItem('view')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('view', view);
    }, [view]);
    useEffect(() => {
    }, [props.login])
    return (
        <div className="main-app">
            {props.login ? <Body view={view} setView={setView}/> : <NotFound/>}
            <Navbar setView={setView}/>
        </div>
    );
};

export default MainApp;
