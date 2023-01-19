import "./Profile.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const navigate = useNavigate();

    function validateEmail() {
        const regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            return true;
        } else {
            alert("Please enter a valid email");
            return false;
        }
    }

    //make sure entered password is correct regex
    function validatePassword() {
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (password === confirmPassword) {
            if (regex.test(password)) {
                return true;
            } else {
                alert(
                    "Password must have at least: 1 lowercase, 1 uppercase, 1 number at least 8 character and 1 special character"
                );
                return false;
            }
        } else {
            alert("password not match");
        }
    }

    function validateForm() {
        if (validateEmail() && validatePassword()) {
            axios
                .post(`http://localhost:3010/customer/edit`, {
                    username: username,
                    password: password,
                    email: email,
                    phone: phone,
                    firstname: firstname,
                    lastname: lastname,
                })
                .then(function (response) {
                    console.log(response.data.status);
                    if (response.data.status == "signUp") {
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
                    console.log(error);
                });
        }
    }

    // admin,password,owner@mail.com,000-000-0000

    const signUp = (e) => {
        e.preventDefault();
        validateForm();
    };
    const edit = (e) => {
        // validateEmail()
        // validatePassword()
        axios
            .put(
                `http://localhost:3010/customer/edit`,
                {
                    username: username,
                    password: password,
                    email: email,
                    phone: phone,
                    firstname: firstname,
                    lastname: lastname,
                },
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
                }
            )
            .then((res) => {
                console.log(res);
                navigate("/login");
            });
    };
    useEffect(() => {
        axios
            .get(`http://localhost:3010/customer`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((res) => {
                console.log(res)
                setEmail(res.data.email);
                setFirstname(res.data.firstname);
                setLastname(res.data.lastname);
                setUsername(res.data.username);
                setPhone(res.data.phone);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="main-cont1">
            <div className="reg-form-cont1">
                <div className="signup-form-header1">
                    <h2>Profile</h2>
                </div>
                {/* <form onSubmit={signUp}> */}
                <form className="signup-form1">
                    <h4 className="signup-form-lables">First Name : </h4>
                    <input
                        className="signup-form-inputs"
                        type="text"
                        name="firstname"
                        defaultValue={firstname}
                        onChange={(e) => {
                            setFirstname(e.target.value);
                        }}
                    />
                    <h4 className="signup-form-lables">Last Name : </h4>
                    <input
                        className="signup-form-inputs"
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        defaultValue={lastname}
                        onChange={(e) => {
                            setLastname(e.target.value);
                        }}
                    />
                    <h4 className="signup-form-lables">Username : </h4>
                    <input
                        className="signup-form-inputs"
                        type="text"
                        name="username"
                        placeholder=" Username"
                        defaultValue={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <h4 className="signup-form-lables">Password : </h4>
                    <input
                        className="signup-form-inputs"
                        type="text"
                        name="password"
                        placeholder=" Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <h4 className="signup-form-lables">Confirm Pass : </h4>
                    <input
                        className="signup-form-inputs"
                        type="text"
                        name="confirmPassword"
                        placeholder=" ConfirmPassword"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    <h4 className="signup-form-lables">Email : </h4>
                    <input
                        className="signup-form-inputs"
                        type="text"
                        name="email"
                        placeholder=" Email"
                        defaultValue={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <h4 className="signup-form-lables">Phone Number : </h4>
                    <input
                        className="signup-form-inputs"
                        type="text"
                        name="phone"
                        defaultValue={phone}
                        placeholder=" Phone"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                    <br></br>
                </form>
                <div
                    className="return-to-login-btn"
                    onClick={() => navigate("/login")}
                >
                    Return to Home Website
                </div>
                <div style={{display: "grid", gridTemplateColumns: "auto auto auto"}}>
                    <input
                        className="signup-form-btn1"
                        type="button"
                        onClick={edit}
                        value="Edit"
                    />

                    <input
                        className="signup-form-btn1"
                        type={"button"}
                        onClick={() => {
                            localStorage.removeItem("jwt");
                            navigate("/login");
                        }}
                        value="Logout"
                    ></input>
                    <input
                        className="signup-form-btn1"
                        type="button"
                        onClick={() => {
                            axios.delete("http://localhost:3010/customer/user", {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                                },
                            });
                            // 2,Jane,Doe,022-222-2222,janedoe@mail.com,janedoe,1234,2022-12-30 16:38:57.656000 +00:00,2022-12-30 16:38:57.656000 +00:00
                        }}
                        value="Delete"
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
