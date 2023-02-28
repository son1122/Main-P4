import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header, H2 } from "../StylesPages/UsersForm";
import { FaUserCircle } from "react-icons/fa";
import "./Login.css";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://tipinsurephp.test/api/check-login", { email, password })
            .then((res) => {
                console.log("Logged in");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="formArea">
            <Header>
                <FaUserCircle style={{ color:"#090E9F", fontSize: "60px", marginBottom: "10px" }}></FaUserCircle>
                <H2>LOG IN</H2>
            </Header>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <a href="/register">Don't have an account? Register!!</a>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}