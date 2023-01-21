import "./buy.css"
import {useEffect, useState} from "react";
import axios from "axios";

const Buy = () => {
    const [buyView, setBuyView] = useState(0)
    const [year, setYear] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [carYearData, setCarYearData] = useState()
    const [carBrandData, setCarBrandData] = useState()
    const [carModelData, setCarModelData] = useState()
    const [sex,setSex]=useState()
    // const
    useEffect(() => {
        setBuyView(JSON.parse(window.localStorage.getItem('buyView')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('buyView', buyView);
    }, [buyView]);

    const handleChangeSelectYear = (e) => {
        setYear(e.target.value);
    };
    const handleChangeSelectBrand = (e) => {
        setBrand(e.target.value);
    };
    const handleChangeSelectModel = (e) => {
        setModel(e.target.value);
    };
    // Car Year
    useEffect(() => {
        const select = axios
            .get("http://localhost:3010/admin/getcaryear", {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let data = resu.data.map((name, index) => {
                    console.log(name.year)
                    return (
                        <option value={name.year} key={index}>
                            {name.year}
                        </option>
                    );
                });
                setCarYearData(data)
            })
    }, [])
    useEffect(() => {
        const select = axios
            .get("http://localhost:3010/admin/getcarmodel/" + year, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let data = resu.data.map((name, index) => {
                    console.log(name.brand)
                    return (
                        <option value={name.brand} key={index}>
                            {name.brand}
                        </option>
                    );
                });
                setCarBrandData(data)
            })
    }, [year])
    useEffect(() => {
        const select = axios
            .get("http://localhost:3010/admin/getcarmodel/" + year + "/" + brand, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let data = resu.data.map((name, index) => {
                    console.log(name.model)
                    return (
                        <option value={name.model} key={index}>
                            {name.model}
                        </option>
                    );
                });
                setCarModelData(data)
            })
    }, [brand])

    return (
        <div className={"buy-grid"}>
            <div className={"buy-grid-icon"}>
                <button onClick={() => setBuyView(0)}>Car insurance</button>
                <button onClick={() => setBuyView(1)}>Health insurance</button>
                <button onClick={() => setBuyView(2)}>House insurance</button>
                <button onClick={() => setBuyView(3)}>Claim</button>
            </div>
            <div className={"buy-body buy-scroll"}>
                {buyView == 0 && <div className={""}>
                    <h1>Car Insurance</h1>
                    <h2>Car Data</h2>
                    {(buyView == 0) && <div>
                        <h3>Please Select Car Year</h3>
                        <select name="<OrderID>" id="OrderID" onChange={handleChangeSelectYear}>
                            <option value="" selected disabled hidden>
                                Choose Specific Order
                            </option>
                            {carYearData}
                        </select>
                    </div>}
                    {(buyView == 0 & year != "") ? <div>
                        <h3>Please Select Car Model</h3>
                        <select name="<OrderID>" id="OrderID" onChange={handleChangeSelectBrand}>
                            <option value="" selected disabled hidden>
                                Choose Specific Order
                            </option>
                            {carBrandData}
                        </select>
                    </div> : <></>}
                    {(buyView == 0 & brand != "") ? <div>
                        <h3>Please Select Car Model</h3>
                        <select name="<OrderID>" id="OrderID" onChange={handleChangeSelectModel}>
                            <option value="" selected disabled hidden>
                                Choose Specific Order
                            </option>
                            {carModelData}
                        </select>
                    </div> : <></>}
                    <h2>personal data</h2>
                    <form>
                        SELECT GENDER
                        <br/>
                        <input type="radio" name="gender" id="male" />
                        <label htmlFor="male">Male</label><br/>
                        <input type="radio" name="gender" id="female"/>
                        <label htmlFor="female">Female</label>
                    </form>

                </div>}

                {buyView == 1 && <div>Health Insurance</div>}
                {buyView == 2 && <div>House Insurance</div>}
                {buyView == 3 && <div>Claim</div>}
            </div>
        </div>
    );
};

export default Buy
