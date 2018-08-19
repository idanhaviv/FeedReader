import React from "react";
import Loader from "react-loader";

export default Component => ({ isLoading, ...otherProps }) => (
  <div>
    <Loader loaded={!isLoading} />
    <Component {...otherProps} />
  </div>
);
