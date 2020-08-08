import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import Contract from "./contracts/Migrations.json";
import getWeb3 from "./getWeb3";

function App() {
  const [owner, setOwner] = useState();
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Contract.networks[networkId];
        const instance = new web3.eth.Contract(
          Contract.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const load = async () => {
      const owner = await contract.methods.owner().call();
      setOwner(owner);
    };
    const isWeb3Valid = typeof web3 !== "undefined" && Object.keys(web3).length !== 0;
    const isAccountValid = typeof accounts !== "undefined" && Object.keys(accounts).length !== 0;
    const isContractValid = typeof contract !== "undefined" && Object.keys(contract).length !== 0;
    if (isWeb3Valid && isAccountValid && isContractValid) {
      load();
    }
  }, [web3, accounts, contract]);

  // TODO - Use another state (isLoading) instead of using web3
  if (typeof web3 === "undefined") {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h2>{owner}</h2>
    </div>
  );
}

export default App;
