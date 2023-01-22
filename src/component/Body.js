// import "./Navbar.css";
import './Body.css'
import Dashboard from "./Dashboard";
import Buy from "./buy/Buy";
import Profile from "./Profile/Profile";

const Body = (props) => {
    return (
        <div className={"body"}>
            {props.view == 0 && <Dashboard/>}
            {props.view == 1 && <Buy setView={props.setView}/>}
            {props.view == 2 && <Profile/>}
        </div>
    );
};

export default Body
