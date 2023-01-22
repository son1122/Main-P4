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
    const [sex,setSex]=useState("")
    const [capital,setCapital]=useState("")
    const [family,setFamily]=useState("")
    const [plate,setPlate]=useState("")
    const [province,setProvince]=useState("")
    const [type,setType]=useState("")
    const buyCar =()=>{
        if(province==""||plate==""||type==""){
            alert("Pleas fill Plate and Province Data and type")
            return
        }
        axios
            .post(`http://localhost:3010/customer/newinsure`, {
                year:year,
                brand:brand,
                model:model,
                plate:plate,
                province:province,
                type:type,
            },{
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            })
            .then(res=>{

            }).catch(e=>alert("error"))
    }
    // const
    useEffect(() => {
        setBuyView(JSON.parse(window.localStorage.getItem('buyView')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('buyView', buyView);
    }, [buyView]);
    const handleChangeSelectType = (e) => {
        setType(e.target.value);
    };
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
            .get("http://localhost:3010/customer/getcaryear", {
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
            .get("http://localhost:3010/customer/getcarmodel/" + year, {
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
            .get("http://localhost:3010/customer/getcarmodel/" + year + "/" + brand, {
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
                <button onClick={() => setBuyView(0)}>Car Insurance</button>
                <button onClick={() => setBuyView(1)}>Health Insurance</button>
                <button onClick={() => setBuyView(2)}>House Insurance</button>
                <button onClick={() => setBuyView(3)}>Saving Insurance</button>
            </div>
            <div className={"buy-body buy-scroll"}>
                {buyView == 0 && <div className={""}>
                    <h1>Car Insurance Type</h1>
                    <select name="<OrderID>" id="OrderID" onChange={handleChangeSelectType}>
                        <option value="" selected disabled hidden>
                            Please Select
                        </option>
                        <option value={1} key={1}>
                            Type 1
                        </option>
                        <option value={2} key={2}>
                            Type 2
                        </option>
                        <option value={3} key={3}>
                            Type 3
                        </option>
                    </select>
                    <p>Car Plate</p>
                    <input type={"text"} placeholder={"Plate Number"}  onChange={(e) => {
                        setPlate(e.target.value);
                    }}/>
                    <p>Province</p>
                    <input type={"text"} placeholder={"Province"} onChange={(e) => {
                        setProvince(e.target.value);
                    }}/>
                    <h2>Car Data</h2>
                    {(buyView == 0) && <div>
                        <h3>Please Select Car Year</h3>
                        <select name="<OrderID>" id="OrderID" onChange={handleChangeSelectYear}>
                            <option value="" selected disabled hidden>
                                Please Select
                            </option>
                            {carYearData}
                        </select>
                    </div>}
                    {(buyView == 0 & year != "") ? <div>
                        <h3>Please Select Car Brand</h3>
                        <select name="<OrderID>" id="OrderID" onChange={handleChangeSelectBrand}>
                            <option value="" selected disabled hidden>
                                Please Select
                            </option>
                            {carBrandData}
                        </select>
                    </div> : <></>}
                    {(buyView == 0 & brand != "") ? <div>
                        <h3>Please Select Car Model</h3>
                        <select name="<OrderID>" id="OrderID" onChange={handleChangeSelectModel}>
                            <option value="" selected disabled hidden>
                                Please Select
                            </option>
                            {carModelData}
                        </select>
                    </div> : <></>}
                    {(buyView == 0 & model != "") ? <div>
                    <h2>personal data</h2>
                    <form>
                        <h4>SELECT GENDER</h4>
                        <input type="radio" name="gender" id="male" onClick={()=>setSex("man")}/>
                        <label htmlFor="male">Male</label>
                        <input type="radio" name="gender" id="female" onClick={()=>setSex("female")}/>
                        <label htmlFor="female">Female</label>
                        <input type="radio" name="gender" id="female" onClick={()=>setSex("other")}/>
                        <label htmlFor="female">LGBTQ</label>
                        <br/>
                        <h4>Capital</h4>
                        <input type="radio" name="capital" id="male" onClick={()=>setCapital("true")}/>
                        <label htmlFor="male">Drive in Capital</label>
                        <input type="radio" name="capital" id="female" onClick={()=>setCapital("false")}/>
                        <label htmlFor="female">Out of Town</label>
                        <br/>
                        <h4>Family</h4>
                        <input type="radio" name="family" id="male"  onClick={()=>setFamily("single")}/>
                        <label htmlFor="male">Single</label>
                        <input type="radio" name="family" id="female" onClick={()=>setFamily("marry")}/>
                        <label htmlFor="female">Marry</label>
                        <input type="radio" name="family" id="female" onClick={()=>setFamily("kid")}/>
                        <label htmlFor="female">Marry with Kids</label>
                        <br/>
                        <br/>
                    </form>
                    </div> : <></>}
                    {(buyView == 0 & family != ""& capital!=""&sex!="") ? <div>
                        <button onClick={buyCar}>Submit</button>
                        <br/>
                        <br/>
                        <br/>
                    </div>:<></>}
                </div>}

                {buyView == 1 && <div>Health Insurance</div>}
                {buyView == 2 && <div>House Insurance</div>}
                {buyView == 3 && <div>Saving Insurance</div>}
            </div>
        </div>
    );
};

export default Buy
