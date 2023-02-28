import "./Navbar.css";

const Navbar = (props) => {
    return (
        <div>
            <div className={"navbar-grid"}>
                <p></p>
                <p></p>
                {/*<div className="navbar-item-cont">*/}
                {/*    <div>*/}
                {/*        <img src="https://cdn-icons-png.flaticon.com/512/6821/6821002.png"*/}
                {/*             onClick={() => props.setView(0)}></img>*/}
                {/*        <p className={"hide-portrait"}>Dashboard</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="navbar-item-cont">
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/2603/2603735.png"
                             onClick={() => props.setView(1)}></img>
                        <p className={"hide-portrait"}>Buy</p>
                    </div>
                </div>
                <div className="navbar-item-cont">
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
                             onClick={() => props.setView(2)}></img>
                        <p className={"hide-portrait"}>Profile</p>
                    </div>
                </div>
                <p></p>
                <p></p>
            </div>
        </div>
    );
};

export default Navbar;
