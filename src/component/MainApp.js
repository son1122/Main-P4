import "./Navbar.css";
import Body from "./Body";
import './MainApp.css'
import Navbar from "./nav";
import {Route, Routes} from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import {useEffect, useState} from "react";

const MainApp = (props) => {
    const [view, setView] = useState(0)
    useEffect(() => {
    }, [props.login])
    return (
        <div className="main-app">
            {props.login ? <Body view={view}/> : <NotFound/>}
            <Navbar setView={setView}/>
        </div>
    );
};

export default MainApp;
