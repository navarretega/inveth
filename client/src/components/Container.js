import React from "react";

function Container(props) {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-24 mb-10">
      {props.extra ? <div className="max-w-lg mx-auto">{props.children}</div> : props.children}
    </div>
  );
}

export default Container;
