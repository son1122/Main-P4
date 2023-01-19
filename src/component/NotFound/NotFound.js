import "./NotFound.css";
import React, {useEffect} from "react";

const NotFound = () => {

    return (
        <div className="not-found-cont">
            <a href={"/login"} className={"not-found-backlogin"}>
                Back To Login Page
            </a>
        </div>
    );
};

export default NotFound;
