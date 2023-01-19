import "./DashboardView.css";
import React, {useState, useEffect} from "react";
import axios from "axios";

import GridLoader from "react-spinners/GridLoader";

const Customer = () => {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    useEffect(() => {
        axios
            .get(`https://backend-sei-project-3.cyclic.app/dashboard/customer`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let dataRes = resu.data.map((name, index) => {
                    console.log(name);
                    return (
                        <div className="customer-item-container">
                            <h3>
                                <span className="employer-list-item-label">ID: </span> {name.id}
                            </h3>
                            <h3>
                                <span className="employer-list-item-label">Name: </span>
                                {name.firstname} {name.lastname}
                            </h3>
                            <h3>
                                <span className="employer-list-item-label">Phone: </span>
                                {name.phone}
                            </h3>
                            <h3>
                                <span className="employer-list-item-label">Email: </span>
                                {name.email}{" "}
                            </h3>
                            <br/>
                        </div>
                    );
                });
                setData(dataRes);
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
                <div>
                    <h1>Customer List</h1>
                    <div className="customer-list-container">{data}</div>
                </div>
            )}
        </div>
    );
};
export default Customer;
