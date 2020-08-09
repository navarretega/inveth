import React, { useState, useEffect } from "react";

import CustomToken from "./contracts/CustomToken.json";
import CustomTokenSale from "./contracts/CustomTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import EthContext from "./EthContext";
import getWeb3 from "./getWeb3";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Cards from "./components/Cards";
import "./styles.css";

function App() {
  const [eth, setEth] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();

        const tokenNetwork = CustomToken.networks[networkId];
        const tokenInstance = new web3.eth.Contract(CustomToken.abi, tokenNetwork && tokenNetwork.address);

        const tokenSaleNetwork = CustomTokenSale.networks[networkId];
        const tokenSaleInstance = new web3.eth.Contract(CustomTokenSale.abi, tokenSaleNetwork && tokenSaleNetwork.address);

        const kycNetwork = KycContract.networks[networkId];
        const kycInstance = new web3.eth.Contract(KycContract.abi, kycNetwork && kycNetwork.address);

        setEth({
          web3: web3,
          accounts: accounts,
          tokenInstance: tokenInstance,
          tokenSaleInstance: tokenSaleInstance,
          kycInstance: kycInstance,
        });
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    // This is optional
    // Making sure everything is ready before loading the page
    const { web3, accounts, tokenInstance, tokenSaleInstance, kycInstance } = eth;
    const isWeb3Valid = typeof web3 !== "undefined" && Object.keys(web3).length !== 0;
    const isAccountValid = typeof accounts !== "undefined" && Object.keys(accounts).length !== 0;
    const isTokenInstanceValid = typeof tokenInstance !== "undefined" && Object.keys(tokenInstance).length !== 0;
    const isTokenSaleInstanceValid = typeof tokenSaleInstance !== "undefined" && Object.keys(tokenSaleInstance).length !== 0;
    const isKycInstanceValid = typeof kycInstance !== "undefined" && Object.keys(kycInstance).length !== 0;
    if (isWeb3Valid && isAccountValid && isTokenInstanceValid && isTokenSaleInstanceValid && isKycInstanceValid) {
      setIsLoading(false);
    }
  }, [eth]);

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
    <EthContext.Provider value={eth}>
      <Header />
      <Stats />
      <Cards />
    </EthContext.Provider>
  );
}

export default App;
