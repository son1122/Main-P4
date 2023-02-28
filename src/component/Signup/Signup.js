import "./Signup.css";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {

    const [name, setName] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [prefix, setPrefix] = useState("");
    const [type, setType] = useState("BROKER");
    const [license, setLicense] = useState("");
    const [expire, setExpire] = useState("");
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [subDistrict, setSubDistrict] = useState("");
    const [district, setDistrict] = useState("");
    const [customerProvince, setCustomerProvince] = useState("");
    const [zip, setZip] = useState("");
    const [province, setProvince] = useState();
    const [govermentId, setGovermentId] = useState();

    function validateForm() {
        if (true) {
            axios
                .post(`http://127.0.0.1:8000/api/customer`, {
                "name" :name,
                "lastname":lastName,
                "prefix":prefix,
                "address":address,
                "subDistrict":subDistrict,
                "district":district,
                "province":province,
                "zip":zip,
                "phone":phone,
                "email":email,
                "registerId":"1222",
                "govermentId":govermentId,
                "dateRegister":"2022-02-28",
                })
                .then(function (response) {
                    console.log(response.data)
                    if (response.data.status == "Username has taken") {
                        alert("Username already taken")
                    } else if (response.data.response == 200) {
                        navigate("/login");
                    } else {
                        if (
                            "error SequelizeUniqueConstraintError: Validation error" ==
                            response.data
                        ) {
                            alert("User name is already use");
                        } else {
                            alert("error please try again");
                        }
                    }

                })
                .catch(function (error) {
                });
        }
    }

    const signUp = (e) => {
        // e.preventDefault();
        validateForm();
    };
    return (
        <div style={{textAlign: "center", marginTop: "10%"}}>
            <h3>
                Agent Register
            </h3>

            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                margin: "1%",
                marginTop: "3%",
                padding: "3%",
                alignItems:"center"
            }}>

                <p>Prefix</p>
                <input onChange={(e) => {
                    setPrefix(e.target.value)
                }
                }/>
                <p>First Name</p>
                <input onChange={(e) => {
                    setName(e.target.value)
                }
                }/>
                <p>Last Name</p>
                <input onChange={(e) => {
                    setLastname(e.target.value)
                }
                }/>
                <p>Phone</p>
                <input onChange={(e) => {
                    setPhone(e.target.value)
                }}/>
                <p>Email</p>
                <input onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
                    Address <input value={address} onChange={(e)=>{setAddress(e.target.value)}}/><br/><br/>
                    Sub District <input value={subDistrict} onChange={(e)=>{setSubDistrict(e.target.value)}}/><br/><br/>
                    District <input value={district} onChange={(e)=>{setDistrict(e.target.value)}}/><br/><br/>
                    Province <input value={province} onChange={(e)=>{setProvince(e.target.value)}}/><br/><br/>
                    zipcode <input value={zip} onChange={(e)=>{setZip(e.target.value)}}/><br/><br/>
                    Goverment ID
                <input onChange={(e) => {
                    setGovermentId(e.target.value)
                }}/>
            </div>
            <div>
                <button className={"button"} style={{marginLeft: "3%", width: "200px"}} onClick={()=>signUp()}>Register</button>
                <button className={"button"} style={{marginLeft: "3%", width: "200px"}} onClick={()=>navigate("/login")}>Login Page</button>
            </div>
        </div>
    );
};

export default Signup;
