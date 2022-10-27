import React from "react";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";

const NavBar = (props) => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getTemperaments());
  }, [dispatch]);




  const temperaments = useSelector((state) => state.temperaments);





  return (
    <div className="topnav">
      <div>
        <h1>Henry Dogs</h1>
      </div>
      <div>
        <select>
          <option value="all">Temperaments</option>
          {temperaments?.map((elem) => (
            <option value={elem.name} key={elem.id}>
              {elem.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NavBar;
