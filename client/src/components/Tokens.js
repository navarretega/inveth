import React, { useState, useEffect, useContext } from "react";

import Kyc from "./Kyc";
import Header from "./Header";
import Buy from "./Buy";
import EthContext from "../EthContext";
import Loading from "./Loading";
import Container from "./Container";
import Pending from "./Pending";

function Tokens() {
  const eth = useContext(EthContext);

  const [isPending, setIsPending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { accounts, kycInstance } = eth;
      const kycCompleted = await kycInstance.methods.kycCompleted(accounts[0]).call();
      setIsLoading(false);
      setIsVerified(kycCompleted);
    };
    init();
  }, [isVerified]);

  useEffect(() => {
    const { accounts } = eth;
    const pendingAccount = localStorage.getItem("kyc-account");
    if (pendingAccount && JSON.parse(pendingAccount) === accounts[0]) {
      setIsLoading(false);
      setIsPending(true);
    }
  }, [isPending]);

  if (isLoading) {
    return <Loading />;
  }

  if (isPending) {
    return (
      <>
        <Header />
        <Container extra>
          <Pending />
        </Container>
      </>
    );
  }

  if (isVerified) {
    return (
      <>
        <Header />
        <Container>
          <Buy />
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Kyc setIsPending={setIsPending} />
      </Container>
    </>
  );
}

export default Tokens;
