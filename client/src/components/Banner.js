import React from "react";

function Banner(props) {
  return (
    <div className="absolute top-0 w-full bg-indigo-500">
      <div className="max-w-screen-xl mx-auto py-2 px-2 sm:px-4 lg:px-6">
        <div className="sm:text-center">
          <p className="font-medium text-white">
            <span className="">Your investment: {props.investment} OKH</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
