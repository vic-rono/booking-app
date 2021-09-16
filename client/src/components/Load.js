import React  from "react";
import Loader from "react-loader-spinner";

const Load = () => {
  
  return (
    <div style={{marginTop: '150px'}}>
      <Loader
        type="Oval"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
};

export default Load;
