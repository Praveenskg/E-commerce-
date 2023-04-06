import React, { useState, useEffect } from "react";
import axios from "axios";
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

function SignUp() {
  const [justifyActive, setJustifyActive] = useState("tab2");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function change1(e) {
    setUsername(e.target.value);
  }

  function change2(e) {
    setEmail(e.target.value);
  }
  function change3(e) {
    setPassword(e.target.value);
  }

  function submit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("http://localhost:8000/register", formData)
      .then((res) => console.log(" 1 User registered "));
  }
  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  return (
    <>
      <MDBContainer className=" bg-light rounded p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between "
        >
          <MDBTabsItem>
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
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent className="row  offset-1 col-10">
          <MDBTabsPane show={justifyActive === "tab2"}>
            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="form1"
              type="text"
              name="username"
              onChange={change1}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              name="email"
              id="form"
              type="email"
              onChange={change2}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              name="password"
              onChange={change3}
            />

            <MDBBtn className="mb-4 w-100" onClick={submit}>
              Sign up
            </MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </>
  );
}

export default SignUp;
