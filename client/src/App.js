import React, { useState, useEffect } from "react";

import CustomToken from "./contracts/CustomToken.json";
import getWeb3 from "./getWeb3";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Cards from "./components/Cards";
import "./styles.css";

function App() {
  const [owner, setOwner] = useState();
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CustomToken.networks[networkId];
        const instance = new web3.eth.Contract(
          CustomToken.abi,
          deployedNetwork && deployedNetwork.address
        );
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const load = async () => {
      const symbol = await contract.methods.symbol().call();
      setOwner(symbol);
      setIsLoading(false);
    };
    const isWeb3Valid = typeof web3 !== "undefined" && Object.keys(web3).length !== 0;
    const isAccountValid = typeof accounts !== "undefined" && Object.keys(accounts).length !== 0;
    const isContractValid = typeof contract !== "undefined" && Object.keys(contract).length !== 0;
    if (isWeb3Valid && isAccountValid && isContractValid) {
      load();
    }
  }, [web3, accounts, contract]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Stats />
      <Cards />
    </>
  );
}

export default App;
