import React, {useEffect, useState} from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";

const AnyReactComponent = ({text}) => (
    <div>
        <img
            style={{width: "50px"}}
            src={"https://static.thenounproject.com/png/2900961-200.png"}
        />
        <h3
            style={{
                color: "#252525",
                backgroundColor: "#fff",
                // border: "red solid 1px",
                MozBoxShadow: "0 0 3px #ccc",
                WebkitBoxShadow: "0 0 3px #ccc",
                boxShadow: "0 0 3px #ccc",
                width: "100px",
            }}
        >
            {text}
        </h3>
    </div>
);

const Restaurant = ({text}) => (
    <div>
        <img
            style={{
                width: "50px", borderRadius: "50%",
                height: "50px",
                backgroundColor: "blue"
            }}
            src={
                "https://cdn-icons-png.flaticon.com/512/9428/9428173.png"}
        />
        <h3
            style={{
                color: "#252525",
                backgroundColor: "rgba(255,255,255,0.7)",
                // border: "red solid 1px",
                MozBoxShadow: "0 0 3px #ccc",
                WebkitBoxShadow: "0 0 3px #ccc",
                boxShadow: "0 0 3px #ccc",
                width: "100px",
            }}
        >
            <h3>บมจ.ทิพยประกันภัย<br/>
                (สำนักงานใหญ่)</h3>
        </h3>
    </div>
);
const Seller = ({text}) => (
    <div>
        <img
            style={{
                width: "50px", borderRadius: "50%",
                height: "50px",
                backgroundColor: "red"
            }}
            src={
                "https://cdn-icons-png.flaticon.com/512/3627/3627886.png"
            }
        />
        <h4
            style={{
                color: "#252525",
                backgroundColor: "rgba(255,255,255,0.7)",
                // border: "red solid 1px",
                MozBoxShadow: "0 0 3px #ccc",
                WebkitBoxShadow: "0 0 3px #ccc",
                boxShadow: "0 0 3px #ccc",
                width: "110px",
            }}
        >
            {text}
        </h4>
    </div>
);
const Customer = ({text}) => (
    <div>
        <img
            style={{
                width: "50px", borderRadius: "50%",
                height: "50px",
                backgroundColor: "blue"
            }}
            src={
                "https://cdn-icons-png.flaticon.com/512/9428/9428173.png"}
        />
        <h3
            style={{
                color: "#252525",
                backgroundColor: "rgba(255,255,255,0.7)",
                // border: "red solid 1px",
                MozBoxShadow: "0 0 3px #ccc",
                WebkitBoxShadow: "0 0 3px #ccc",
                boxShadow: "0 0 3px #ccc",
                width: "100px",
            }}
        >
            {text}
        </h3>
    </div>
);

export default function Location() {
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    const defaultProps = {
        center: {
            lat: 13.701220956171696,
            lng: 100.5453268115759,
            // 13.685321440355466, 100.61134873568787
        },
        zoom: 14,
    };
    const [dataSeller, setDataSeller] = useState(
        <Customer lat={13} lng={100} text={"ton"}/>
    );
    const [dataCustomer, setDataCustomer] = useState(
        <Customer lat={13} lng={100} text={"ton"}/>
    );
    const [tag, setTag] = useState(
        <div style={{height: "90vh", width: "100%"}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyCydjBdpgXghRhSydQApTfwxDWPaa0GFPY"}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {/*13.701220956171696, 100.5453268115759*/}
                <Restaurant
                    lat={13.701220956171696}
                    lng={100.5453268115759}
                    text="Restaurant "
                />
                {dataCustomer}
                {dataSeller}
            </GoogleMapReact>
        </div>
    );
    useEffect(() => {
        axios
            .get(
                "https://backend-sei-project-3.cyclic.app/dashboard/location/seller",
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
                }
            )
            .then((resSeller) => {
                let tagSell = resSeller.data.map((dataSell, index) => {
                    return (
                        <Seller
                            key={index}
                            lat={dataSell.Location.lat}
                            lng={dataSell.Location.lng}
                            text={dataSell.name}
                        />
                    );
                });
                // console.log(tagSell);
                setDataSeller(tagSell);
            })
            .catch((e) => {
            });
        axios
            .get(
                "https://backend-sei-project-3.cyclic.app/dashboard/location/customer",
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
                }
            )
            .then((resCustomer) => {
                // console.log(resCustomer.data);
                let tagCust = resCustomer.data.map((dataCus, index) => {
                    // console.log(dataCus);
                    return (
                        <Customer
                            lat={dataCus.Location.lat}
                            lng={dataCus.Location.lng}
                            text={dataCus.firstname + "   " + dataCus.lastname}
                        />
                    );
                });
                setDataCustomer(tagCust);
            })
            .catch((e) => {
            });
        setTag(
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyCydjBdpgXghRhSydQApTfwxDWPaa0GFPY"}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <Restaurant
                    lat={13.701220956171696}
                    lng={100.5453268115759}
                    text="Restaurant "
                />
                {dataCustomer}
                {dataSeller}
            </GoogleMapReact>
        );
    }, []);

    useEffect(() => {
        setTag(
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_MAP_API}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <Restaurant
                    lat={13.701220956171696}
                    lng={100.5453268115759}
                    text="Restaurant "
                />
                {dataCustomer}
                {dataSeller}
            </GoogleMapReact>
        );
    }, [dataSeller]);
    return (
        <div className={isLoading ? "summary-loading-center" : "grid28"}>
            <h2 style={{color:"white"}}>
                Location
            </h2>
            {isLoading ? (
                <GridLoader
                    color={"#ff2531"}
                    loading={isLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div style={{height: "90vh"}}>{tag}</div>
            )}
        </div>
    );
}
