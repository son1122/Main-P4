import "./DashboardView.css";
import React, {useState, useEffect} from "react";
import axios from "axios";

import GridLoader from "react-spinners/GridLoader";

const Seller = () => {
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
            .get(`https://backend-sei-project-3.cyclic.app/dashboard/seller`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let dataRes = resu.data.map((name, index) => {
                    console.log(name);
                    return (
                        <div
                            className="seller-item-cont"
                            style={{
                                backgroundColor: "#ff2531",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "20px",
                                height: "200px",
                                marginLeft: "20px",
                                marginRight: "20px",
                                flexWrap: "wrap",
                            }}
                        >
                            <div className="seller-list-item">
                                <h2>
                                    <span className="employer-list-item-label">ID: </span>{" "}
                                    {name.id}{" "}
                                </h2>
                                <h2>
                                    <span className="employer-list-item-label">Name: </span>{" "}
                                    {name.name}{" "}
                                </h2>
                                <h3>
                                    <span className="employer-list-item-label">Phone: </span>{" "}
                                    {name.phone}{" "}
                                </h3>
                                <h3>
                                    <span className="employer-list-item-label">Email: </span>{" "}
                                    {name.email}{" "}
                                </h3>
                                <br/>
                            </div>
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
                <div style={{height: "90vh"}}>
                    <h1>Customer List</h1>
                    <div
                        style={{
                            overflow: "auto",
                            height: "90vh",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        {data}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Seller;
