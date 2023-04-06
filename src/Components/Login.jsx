import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import Footer from "./Footer";

function Login() {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleChange1(e) {
    e.preventDefault();

    setUserName(e.target.value);
  }
  function handleChange2(e) {
    e.preventDefault();

    setPassword(e.target.value);
  }
  async function mysubmit() {
    const data = { username: username, password: password };

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("http://localhost:8000/login", config);
    const json = await response.json();
    if (json.length === 0) {
      window.alert("invalid user try again");
    } else if (json[0].type === "admin") {
      console.log("welcome admin");
      navigate("/admin");
    } else if (json[0].type === "customer") {
      console.log("customer ");
      localStorage.setItem("cname", username);
      navigate("/product");
    }
  }
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <>
      <MDBContainer className=" bg-light rounded p-3 my-5 d-flex flex-column w-50 ">
        <MDBTabs pills justify className="mb-3 d-flex justify-content-between ">
          <MDBTabsItem className=" ">
            <MDBTabsLink
              href="/login"
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              href="/register"
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent className="row  offset-1 col-10">
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="form1"
              type="email"
              name="username"
              onChange={handleChange1}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              name="password"
              onChange={handleChange2}
            />

            <MDBBtn className="mb-4 w-100" onClick={mysubmit}>
              Sign in
            </MDBBtn>
            <p
              className="text-center"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Not a member? <a href="/register">Register</a>
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}> </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </>
  );
}

export default Login;
