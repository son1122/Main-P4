import "./DashboardView.css";
import "../Dashboard.css";
import React, {useState, useEffect} from "react";
import axios from "axios";

import GridLoader from "react-spinners/GridLoader";

const Employer = () => {
    const [dataChef, setDataChef] = useState();
    const [dataWaiter, setDataWaiter] = useState();
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    useEffect(() => {
        axios
            .get(`https://backend-sei-project-3.cyclic.app/dashboard/chef`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let dataRes = resu.data.map((name, index) => {
                    console.log(name);
                    return (
                        <div className="employer-list-item">
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">ID: </span> {name.id}{" "}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Name: </span>{" "}
                                {name.firstName} {name.lastName}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Phone: </span>{" "}
                                {name.phone}{" "}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Email: </span>{" "}
                                {name.email}{" "}
                            </h3>
                            <br/>
                        </div>
                    );
                });
                setDataChef(dataRes);
            });
        axios
            .get(`https://backend-sei-project-3.cyclic.app/dashboard/waiter`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let dataRes = resu.data.map((name, index) => {
                    console.log(name);
                    return (
                        <div className="employer-list-item">
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">ID: </span> {name.id}{" "}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Name: </span>{" "}
                                {name.firstName} {name.lastName}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Phone: </span>{" "}
                                {name.phone}{" "}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Email: </span>{" "}
                                {name.email}{" "}
                            </h3>
                            <br/>
                        </div>
                    );
                });
                setDataWaiter(dataRes);
            });
    }, []);

    return (
        <div className={isLoading ? "summary-loading-center" : "grid28"}>
            {isLoading ? (
                <GridLoader
                    color={"#ff2531"}
                    loading={isLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div
                    className={"dashboard-grid-half"}
                    style={{overflow: "auto", height: "90vh"}}
                >
                    <div>
                        <h1>Waiter List</h1>
                        <div className="employer-list-cont-chef">{dataChef}</div>
                    </div>
                    <div>
                        <h1>Chef List</h1>
                        <div className="employer-list-cont-waiter">{dataWaiter}</div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Employer;
