import "./Signup.css";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
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
                .post(`https://good-puce-kitten-sari.cyclic.app/customer/signup`, {
                    username: username,
                    password: password,
                    email: email,
                    phone: phone,
                }, {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
                })
                .then(function (response) {
                    if (response.data.status == "Username has taken") {
                        alert("Username already taken")
                    } else if (response.data.status == "signUp") {
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

    // admin,password,owner@mail.com,000-000-0000

    const signUp = (e) => {
        e.preventDefault();
        validateForm();
    };
    return (
        <div className="main-cont">
            <div className="reg-form-cont">
                <div className="signup-form-header">
                    <h2>Register</h2>
                </div>
                {/* <form onSubmit={signUp}> */}
                <form className="signup-form">
                    <h4 className="signup-form-lables">Username : </h4>
                    <input
                        className="signup-form-inputs"
                        type="text"
                        name="username"
                        placeholder=" Username"
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
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <h4 className="signup-form-lables">Phone Number : </h4>
                    <input
                        className="signup-form-inputs"
                        type="text"
                        name="phone"
                        placeholder=" Phone"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                    <br></br>
                </form>
                <div className="return-to-login-btn" onClick={() => navigate("/login")}>
                    Return to login page
                </div>
                <input
                    className="signup-form-btn"
                    type="button"
                    onClick={signUp}
                    value="SignUp"
                />
            </div>
        </div>
    );
};

export default Signup;
