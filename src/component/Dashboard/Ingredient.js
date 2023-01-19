import "./DashboardView.css";
import React, {useState, useEffect} from "react";
import axios from "axios";

import GridLoader from "react-spinners/GridLoader";

const Ingredient = () => {
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
            .get(`https://backend-sei-project-3.cyclic.app/dashboard/ingredient`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                let dataRes = resu.data.map((name, index) => {
                    return (
                        <div className="ingredient-item-item">
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">ID: </span> {name.id}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Name: </span>{" "}
                                {name.name}
                            </h3>
                            <p className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Description: </span>{" "}
                                {name.description}
                            </p>
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
                    <h1>Ingredient List</h1>
                    <div className="ingredient-item-cont">{data}</div>
                </div>
            )}
        </div>
    );
};
export default Ingredient;
