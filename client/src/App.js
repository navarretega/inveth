import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import CustomToken from "./contracts/CustomToken.json";
import CustomTokenSale from "./contracts/CustomTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import ProjectFactory from "./contracts/ProjectFactory.json";
import EthContext from "./EthContext";
import getWeb3 from "./getWeb3";
import Home from "./components/Home";
import Tokens from "./components/Tokens";
import Loading from "./components/Loading";
import Admin from "./components/Admin";

// TODOS
// Use try/catch when calling contracts methods
// The contract instance object must have an address set | instance['_address'] (otherwise it means that the user is using a diff. network)
// Verify useEffect on all components
// Use container component
// KYC - Use DB instead of localStorage
// When using ...call() make sure to consider setting explicetely the account (from), otherwise it defaults to address[0] -- https://web3js.readthedocs.io/en/v1.2.7/web3-eth-contract.html#methods-mymethod-call
// Improve interaction between ProjectFactory & DB

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

        const projectFNetwork = ProjectFactory.networks[networkId];
        const projectFInstance = new web3.eth.Contract(ProjectFactory.abi, projectFNetwork && projectFNetwork.address);

        setEth({
          web3: web3,
          accounts: accounts,
          tokenInstance: tokenInstance,
          tokenSaleInstance: tokenSaleInstance,
          kycInstance: kycInstance,
          projectFInstance: projectFInstance,
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
    // 1. The object must exists
    // 2. The object must have at least one element
    // 3. The contract instance object must have an address set | instance['_address'] (otherwise it means that the user is using a diff. network)
    const { web3, accounts, tokenInstance, tokenSaleInstance, kycInstance, projectFInstance } = eth;
    const isWeb3Valid = typeof web3 !== "undefined" && Object.keys(web3).length !== 0;
    const isAccountValid = typeof accounts !== "undefined" && Object.keys(accounts).length !== 0;
    const isTokenInstanceValid = typeof tokenInstance !== "undefined" && Object.keys(tokenInstance).length !== 0;
    const isTokenSaleInstanceValid = typeof tokenSaleInstance !== "undefined" && Object.keys(tokenSaleInstance).length !== 0;
    const isKycInstanceValid = typeof kycInstance !== "undefined" && Object.keys(kycInstance).length !== 0;
    const isProjectFInstanceValid = typeof projectFInstance !== "undefined" && Object.keys(projectFInstance).length !== 0;
    if (
      isWeb3Valid &&
      isAccountValid &&
      isTokenInstanceValid &&
      isTokenSaleInstanceValid &&
      isKycInstanceValid &&
      isProjectFInstanceValid
    ) {
      setIsLoading(false);
    }
  }, [eth]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <EthContext.Provider value={eth}>
      <Router>
        <Switch>
          <Route path="/buy" exact>
            <Tokens />
          </Route>
          <Route path="/admin" exact>
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </EthContext.Provider>
  );
}

export default App;
