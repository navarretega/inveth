import React from "react";

function Card(props) {
  return (
    <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
      <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={props.imageUrl} />
      <div className="p-6">
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
          {props.location.toUpperCase()} |{" "}
          <span className="text-indigo-500 font-bold">{props.minTokens} OKH</span>
        </h2>
        <h1 className="title-font text-lg font-medium text-gray-900 mb-2">{props.title}</h1>
        <p className="leading-relaxed mb-3">{props.subTitle}</p>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-indigo-500 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
        >
          Invest
        </button>
      </div>
    </div>
  );
}

export default Card;
