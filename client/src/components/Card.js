import React, { useContext, useState, useEffect } from "react";

import EthContext from "../EthContext";
import Project from "../contracts/Project.json";
import Banner from "./Banner";

function Card(props) {
  const eth = useContext(EthContext);
  const [isContributor, setIsContributor] = useState(false);
  const [contributorBalance, setContributorBalance] = useState(0);
  const [numTokens, setNumTokens] = useState(0);
  const { web3, accounts, tokenInstance, projectFAddress } = eth;
  const projectInstance = new web3.eth.Contract(Project.abi, props.address);

  async function handleOnSubmit(e) {
    e.preventDefault();
    await tokenInstance.methods.approve(props.address, numTokens).send({ from: accounts[0] });
    await projectInstance.methods.contribute(numTokens, projectFAddress).send({ from: accounts[0] });
    window.location.reload();
  }

  useEffect(() => {
    async function projectSummary() {
      const isContributor = await projectInstance.methods.contributers(accounts[0]).call();
      const contributorBalance = await projectInstance.methods.balances(accounts[0]).call();
      setIsContributor(isContributor);
      setContributorBalance(contributorBalance);
    }
    projectSummary();
  }, [isContributor, contributorBalance]);

  return (
    <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
      <div className="relative">
        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={props.imageUrl} />
        {isContributor ? <Banner investment={contributorBalance} /> : null}
      </div>
      <div className="p-6">
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
          {props.location.toUpperCase()} | <span className="text-indigo-500 font-bold">{props.minTokens} OKH</span>
        </h2>
        <h1 className="title-font text-lg font-medium text-gray-900 mb-2">{props.title}</h1>
        <p className="leading-relaxed mb-3">{props.subTitle}</p>
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-row justify-between items-center">
            <div className="relative rounded-md shadow-sm w-2/3">
              <input
                id="price"
                className="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
                value={numTokens}
                onChange={(e) => setNumTokens(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm sm:leading-5" id="price-currency">
                  OKH
                </span>
              </div>
            </div>
            <div className="w-1/4">
              <button
                type="submit"
                className="w-full text-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                Invest
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Card;
