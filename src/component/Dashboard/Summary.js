import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Pie} from "@ant-design/plots";
import GridLoader from "react-spinners/GridLoader";
import Word from "./word";
import DemoLine from "./revenue";
import DemoMix from "./test";

const Summary = (props) => {
    const [data, setData] = useState([
        {
            type: "Test",
            value: 27,
        },
    ]);

    const [menuItem, setMenuitem] = useState(
        <option value="loading">Loading</option>
    );
    const navigate = useNavigate();
    const [select, setSelect] = useState();
    const [list, setList] = useState();
    const [formData, setFormData] = useState({});
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeSelect = (e) => {
        setSelect(e.target.value);
    };

    const test = () => {
        axios
            .get(`https://backend-sei-project-3.cyclic.app/customer/data`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((res) => {
            });
    };
    useEffect(() => {
        const select = axios
            .get("https://backend-sei-project-3.cyclic.app/customer/data", {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                let i = 0;
                let price = 0;
                console.log(resu);
                let data = resu.data.map((name, index) => {
                    for (let x = 0; x < name.MenuItems.length; x++) {
                        i += 1;
                        price =
                            price +
                            name.MenuItems[x].price * name.MenuItems[x].OrderDetail.quantity;
                    }
                    return (
                        <option value={name.id} key={index}>
                            {name.id}
                        </option>
                    );
                });
                setTotalOrder(totalOrder + i);
                setMenuitem(data);
                setTotalPrice(price);
                axios
                    .get("https://backend-sei-project-3.cyclic.app/customer/menu", {
                        headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
                    })
                    .then((res) => {
                        let insert = [];
                        for (let i = 0; i < res.data.length; i++) {
                            insert.push({type: res.data[i].name, value: 0});
                        }
                        resu.data.forEach((name, index) => {
                            for (let x = 0; x < name.MenuItems.length; x++) {
                                i += 1;
                                let value = name.MenuItems[x].name;
                                insert.find(
                                    (o) => o.type === name.MenuItems[x].name
                                ).value += 1;
                            }
                        });
                        setData(insert);
                    });
            });
    }, []);

    useEffect(() => {
        if (select !== undefined) {
            axios
                .get(
                    `https://backend-sei-project-3.cyclic.app/customer/data/${select}`,
                    {
                        headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
                    }
                )
                .then((resu) => {
                    let data = resu.data.MenuItems.map((name, index) => {
                        return (
                            <div className="customer-db-third-customerorders-detail-cont-2">
                                <div className="customer-db-third-customerorders-detail">
                                    <img className="customer-db-menu-img" src={name.img}></img>
                                </div>
                                <div className="customer-db-third-customerorders-detail">
                                    {name.name}
                                </div>
                                <div className="customer-db-third-customerorders-detail">
                                    {name.price}
                                </div>
                                <div className="customer-db-third-customerorders-detail">
                                    {name.OrderDetail.quantity}
                                </div>
                            </div>
                        );
                    });
                    setList(data);
                });
        }
    }, [select]);

    const config = {
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "type",
        radius: 0.8,
        autoFit: true,
        label: {
            type: "outer",
            content: "{name} {percentage}",
        },
        interactions: [
            {
                type: "pie-legend-active",
            },
            {
                type: "element-active",
            },
        ],
    };
    return (
        <div
            className="summary-canvas"
            style={{
                display: "grid",
                gridTemplateColumns: "50% 50%",
                gridTemplateRows: "40% 40% 40%",
                overflow: "scroll",
                position: "relative",
                padding: "5%",
                backgroundColor: "#fafafa",
            }}
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
                <div
                    className="summary-canvas"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "50% 50%",
                        gridTemplateRows: "50% 50% 50% 50%",
                        overflow: "scroll",
                        position: "relative",
                        padding: "5%",
                        backgroundColor: "#fafafa",
                        height: "75vh",
                    }}
                >
                    <div>
                        <h2></h2>
                        <Pie {...config} />
                        <Word/>
                    </div>
                    <div>
                        <DemoLine/>
                        <DemoMix/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Summary;
