import React from "react";
import "./Footer.css";
import {
  FaFacebookSquare,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="  footer1 d-flex justify-content-start p-1">
        <p id="link">
          Copyright &#169;{new Date().getFullYear()} All Rights Reserved
        </p>
        <a
          className="link"
          href="https://www.linkedin.com/in/praveen-singh-ald/"
          target="_blank"
        >
          <FaLinkedin />
        </a>
        <a
          className="link insta"
          href="https://www.instagram.com/o_its_praveen"
          target="_blank"
        >
          <FaInstagram />
        </a>
        <a
          className="link twit"
          href="https://twitter.com/Its_Praveen_S"
          target="_blank"
        >
          <FaTwitter />
        </a>
        <a
          className="link fb"
          href="https://www.facebook.com/Praveensald"
          target="_blank"
        >
          <FaFacebookSquare />
        </a>
        <a
          href="https://github.com/Praveenskg"
          className="link git"
          target="_blank"
        >
          {" "}
          <FaGithub />
        </a>
      </div>
    </>
  );
}
