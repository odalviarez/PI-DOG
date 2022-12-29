import React from "react";
import "./Footer.css";
import gitImg from "../../img/github.png";
import linkedin from "../../img/linkedin.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="credits">
        <ul>
          <li>
            <a className="osc" href="https://www.instagram.com/odalviarez/">
              Oscar Alviarez, 2022
            </a>
          </li>
          <li>
            <ul></ul>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/oscar-daniel-alviarez-mendez-3a7291145/">
              <img width="30" height="30" src={linkedin} alt="linkedin" className="linkedin"/>
            </a>
          </li>
          <li>
            <ul></ul>
          </li>
          <li>
            <a href="https://github.com/odalviarez">
              <img width="30" height="30" src={gitImg} alt="github" className="github" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
