import "./DashboardView.css";
import React, {useState, useEffect} from "react";
import axios from "axios";

import GridLoader from "react-spinners/GridLoader";

const Order = () => {
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
            .get(`https://backend-sei-project-3.cyclic.app/dashboard/order`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                let dataRes = resu.data.map((name, index) => {
                    console.log(resu.data);
                    return (
                        <div className="order-orderlist-item">
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Order Id: </span>
                                {name.id}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Customer Id: </span>
                                {name.customer_id}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Table Number: </span>
                                {name.table_number}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Name: </span>{" "}
                                {name.Customer["firstname"]} {name.Customer["lastname"]}
                            </h3>
                            <h3 className="order-orderlist-item-align">
                                <span className="employer-list-item-label">Order Date: </span>
                                {name.order_date}
                            </h3>
                            <br/>
                        </div>
                    );
                });
                setData(dataRes);
            });
    }, []);

    return (
        <div
            className={isLoading ? "summary-loading-center" : null}
            // className={
            //   isLoading ? "order-slide-horizon-loading" : "order-slide-horizon"
            // }
        >
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
                    <div style={{overflow: "auto"}}>
                        <h1>Order List</h1>
                        <div className="order-orderlist-cont">{data}</div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Order;
