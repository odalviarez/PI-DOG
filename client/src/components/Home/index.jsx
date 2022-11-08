//import "./home.css";
import React from "react";
import * as actions from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css"
import linkedin from "../../img/linkedin.png"
import github from "../../img/github.png"
import doggif from "../../img/dogportada.gif"


const Home = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(actions.getAllDogsHome());
    }, [dispatch]);

  return (
    <div className="background">
      <div className="contIzq">
        <div className="titleIndex">Henry Dogs PI</div>
        <div className="contTitle">
          <div className="titleIndex">¡Welcome to your Doggipedia!</div>
          <div className="parrafo">
            Here you can find all the info from your favorite dogs. Also you can
            let your creativity fly and create a new exclusive dog! I hope you
            like it :)
          </div>
          <Link to="/home">
            <button className="btnIntro">Let's go !</button>
          </Link>
        </div>

        <div className="links">
          <a
            href="https://www.linkedin.com/in/oscar-daniel-alviarez-mendez-3a7291145/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="linkedin" className="linkedin" />
          </a>

          <a
            href="https://github.com/odalviarez"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img src={github} alt="github" className="github" />
          </a>
        </div>
      </div>

      <div className="contDer">
        <img src={doggif} alt="doggif" className="doggifImg" />
      </div>
    </div>
  );
};

export default Home;