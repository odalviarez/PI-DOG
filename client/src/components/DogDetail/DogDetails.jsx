import React from "react";
import * as actions from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

const DogDetails = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
    
  React.useEffect(() => {
    dispatch(actions.getDogDetail(id));
  }, [id, dispatch]);

  const dogDetail = useSelector((state) => state.dogDetail);
console.log(dogDetail);

  return (
    <div>
      <h1>{dogDetail.name}</h1>
      <img src={dogDetail.image?.url} alt={dogDetail.image?.url} />
      <p>{dogDetail.temperament}</p>
      <p>{dogDetail.origin}</p>
      <p>{dogDetail.life_span}</p>
    </div>
  );
};

export default DogDetails;
