import React, { useContext, useState } from "react";

import EthContext from "../EthContext";
import Modal from "./Modal";

function Buy() {
  const eth = useContext(EthContext);
  const { accounts, tokenSaleInstance } = eth;
  const [numTokens, setNumTokens] = useState(0);
  const [showModal, setShowModal] = useState(false);

  function handleOnChange(e) {
    const val = e.target.value;
    setNumTokens(val);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await tokenSaleInstance.methods.buyTokens(accounts[0]).send({ from: accounts[0], value: parseInt(numTokens) });
      setShowModal(true);
    } catch (e) {
      console.log(e);
    }
  }

  if (showModal) {
    return <Modal />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="price" className="block text-sm font-medium leading-5 text-gray-700">
            Tokens
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              onChange={handleOnChange}
              id="price"
              className="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
              placeholder="5"
              value={numTokens}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm sm:leading-5" id="price-currency">
                OKH
              </span>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full text-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Buy Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Buy;
