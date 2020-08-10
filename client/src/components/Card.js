import React, { useContext, useState, useEffect } from "react";

import EthContext from "../EthContext";
import Project from "../contracts/Project.json";
import Banner from "./Banner";

function Card(props) {
  const eth = useContext(EthContext);
  const [isContributor, setIsContributor] = useState(false);
  const [contributorBalance, setContributorBalance] = useState(0);
  const { web3, accounts, tokenInstance } = eth;
  const projectInstance = new web3.eth.Contract(Project.abi, props.address);

  async function handleOnClick() {
    await tokenInstance.methods.approve(props.address, 100).send({ from: accounts[0] });
    await projectInstance.methods.contribute(100).send({ from: accounts[0] });
    setIsContributor(true);
    setContributorBalance(100);
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
      {isContributor ? <Banner investment={contributorBalance} /> : null}
      <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={props.imageUrl} />
      <div className="p-6">
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
          {props.location.toUpperCase()} | <span className="text-indigo-500 font-bold">{props.minTokens} OKH</span>
        </h2>
        <h1 className="title-font text-lg font-medium text-gray-900 mb-2">{props.title}</h1>
        <p className="leading-relaxed mb-3">{props.subTitle}</p>
        <button
          onClick={handleOnClick}
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
