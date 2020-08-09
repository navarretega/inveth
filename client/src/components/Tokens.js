import React, { useState, useEffect, useContext } from "react";

import Kyc from "./Kyc";
import Header from "./Header";
import Buy from "./Buy";
import EthContext from "../EthContext";
import Loading from "./Loading";

function Tokens() {
  const eth = useContext(EthContext);

  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { accounts, kycInstance } = eth;
      const kycCompleted = await kycInstance.methods.kycCompleted(accounts[0]).call();
      setIsVerified(kycCompleted);
      setIsLoading(false);
    };
    init();
  }, [isVerified]);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-24 mb-10">{isVerified ? <Buy /> : <Kyc setIsVerified={setIsVerified} />}</div>
      )}
    </>
  );
}

export default Tokens;
