import "./DashboardView.css";
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {DecompositionTreeGraph} from "@ant-design/graphs";
import axios from "axios";

import GridLoader from "react-spinners/GridLoader";

const Menu = () => {
    const [select, setSelect] = useState();
    const [menuItem, setMenuitem] = useState(
        <option value="loading">Loading</option>
    );
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    const items = [
        {
            label: "1st menu item",
            key: "1",
        },
        {
            label: "2nd menu item",
            key: "2",
        },
        {
            label: "3rd menu item",
            key: "3",
        },
    ];
    const [data, setData] = useState({
        value: {
            title: "Please Select Menu",
            items: {
                text: "Price",
                value: "100",
            },
        },
        children: [
            {
                value: {
                    title: "Rice",
                    items: {
                        text: "gram",
                        value: "100",
                    },
                },
            },
        ],
    });
    const [config, setConfig] = useState({
        data,
        autoFit: true,
        // behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        nodeCfg: {
            title: {
                containerStyle: {
                    fill: "#ff2531",
                },
                style: {
                    fill: "#fff",
                    fontSize: 12,
                },
            },
            style: {
                fill: "#E6EAF1",
                stroke: "#B2BED5",
                radius: [2, 2, 2, 2],
            },

            nodeStateStyles: {
                hover: {
                    stroke: "#252525",
                    lineWidth: 3,
                },
            },
            autoWidth: true,
            items: {
                padding: 6,
                fill: "green",
                containerStyle: {
                    fill: "#fff",
                },
            },
        },
    });
    const handleChangeSelect = (e) => {
        setSelect(e.target.value);
    };
    const getData = () => {
        axios
            .get(
                `https://backend-sei-project-3.cyclic.app/dashboard/menu/${select}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
                }
            )
            .then((res) => {
                console.log(res.data);
                // setData(data.value.title= res.data.name)
                const newData = {
                    value: {
                        title: res.data[0].name,
                        items: {
                            text: "Price",
                            value: "100",
                        },
                    },
                    children: [
                        {
                            value: {
                                title: "Rice",
                                items: {
                                    text: "gram",
                                    value: "100",
                                },
                            },
                        },
                    ],
                };
                newData.value.title = res.data[0].name;
                newData.value.items.value = res.data[0].price;
                newData.children[0].value.title = res.data[0].Ingredients[0].name;
                newData.children[0].value.items.value =
                    res.data[0].Ingredients[0].MenuItemIngredient.quantity;
                for (let i = 1; i < res.data[0].Ingredients.length; i++) {
                    newData.children.push({
                        value: {
                            title: res.data[0].Ingredients[i].name,
                            items: {
                                text: "gram",
                                value: res.data[0].Ingredients[i].MenuItemIngredient.quantity,
                            },
                        },
                    });
                }

                setData(newData);
                setConfig({
                    data,
                    autoFit: true,

                    nodeCfg: {
                        title: {
                            containerStyle: {
                                fill: "#ff2531",
                            },
                            style: {
                                fill: "#fff",
                                fontSize: 12,
                            },
                        },
                        style: {
                            fill: "#E6EAF1",
                            stroke: "#B2BED5",
                            radius: [2, 2, 2, 2],
                        },
                        nodeStateStyles: {
                            hover: {
                                stroke: "#000",
                                lineWidth: 3,
                            },
                        },
                        autoWidth: true,
                        items: {
                            padding: 6,
                            fill: "green",
                            containerStyle: {
                                fill: "#fff",
                            },
                        },
                    },
                    behaviors: ["drag-canvas", "zoom-canvas", "drag-node"],
                });
            });
    };
    useEffect(() => {
        axios
            .get(`https://backend-sei-project-3.cyclic.app/dashboard/menuitem`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let data = resu.data.map((name, index) => {
                    console.log(name);
                    return (
                        <option value={name.id} key={index}>
                            {name.name}
                        </option>
                    );
                });
                console.log(data);
                setMenuitem(data);
            });
        // getData()
    }, [select]);
    useEffect(() => {
        getData();
    }, [select]);
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
                <div style={{height: "80vh"}}>
                    <div style={{marginBottom: "10px"}}>
                        <h1>Menu Ingredient View</h1>
                        <select
                            name="<menu>"
                            id="menu"
                            className={"order-side-table-list"}
                            onChange={handleChangeSelect}
                        >
                            <option value="" selected disabled hidden>
                                Choose Menu
                            </option>
                            {menuItem}
                        </select>
                    </div>
                    <DecompositionTreeGraph
                        style={{backgroundColor: "#fafafa"}}
                        {...config}
                    />
                </div>
            )}
        </div>
    );
};
export default Menu;
