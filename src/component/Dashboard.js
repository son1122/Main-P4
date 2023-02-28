import './Dashboard.css'
import Location from "./Dashboard/Location2";
import {useEffect, useState} from "react";
import axios from "axios";

const Dashboard = () => {
    const [numInsure,setNumInsure]=useState(0)
    const [paidInsure,setPaidInsure]=useState(0)
    const [claimInsure,setClaimInsure]=useState(0)
    const [list,setList]=useState()
    useEffect(() => {
        const select = axios
            .get("http://localhost:3010/customer/dashboarddata/", {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let price=0
                setNumInsure(resu.data.length.toLocaleString())
                let data = resu.data.map((name, index) => {
                    console.log(name);
                    price=price+name.priceFinal
                    return (
                        <div className="customer-db-third-customerorders-detail-cont-2">
                            <div className="customer-db-third-customerorders-detail">
                                {index+1}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.insuranceType}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.priceFinal.toLocaleString()}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.plate}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.province}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.endDate}
                            </div>
                        </div>
                    );
                });
                setList(data)
                setPaidInsure(price.toLocaleString())
                });
        let claimCost=0
        const claim = axios
            .get("http://localhost:3010/customer/claim/", {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                resu.data.forEach(i=>{
                    console.log(i.priceClaim)
                    claimCost=claimCost+i.priceClaim
                })
                setClaimInsure(claimCost.toLocaleString())
            })
    }, [])
    return (
        <div className={"scroll"}>
            <div className={"dashboard"}>
                <h1 style={{color:"white"}}>
                    DashBoard
                </h1>
                <div className={"dashboard-summary"}>
                    <div style={{display:"grid",gridTemplateColumns:"50% 50%"}}>
                        <div>
                            <h2>Total Insurance price</h2>
                            <h3>{numInsure}</h3>
                        </div>
                        <div>
                            <h2>Total Sale</h2>
                            <h3>{paidInsure}</h3>
                        </div>

                    </div>
                    <div>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default Dashboard
