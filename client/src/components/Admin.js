import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import EthContext from "../EthContext";
import Loading from "./Loading";
import Header from "./Header";
import Container from "./Container";

function Admin() {
  const eth = useContext(EthContext);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingAccount, setPendingAccount] = useState(null);

  async function handleOnClick() {
    const { accounts, kycInstance } = eth;
    await kycInstance.methods.setKycCompleted(pendingAccount).send({ from: accounts[0] });
    localStorage.removeItem("kyc-account");
    setPendingAccount(null);
  }

  useEffect(() => {
    const pendingAccount = localStorage.getItem("kyc-account");
    if (pendingAccount) {
      setPendingAccount(JSON.parse(pendingAccount));
    }
  }, []);

  useEffect(() => {
    const { accounts, kycInstance } = eth;
    const init = async () => {
      const isOwner = await kycInstance.methods.isOwner().call({ from: accounts[0] });
      if (isOwner) {
        setIsOwner(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    init();
  }, [eth]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isOwner) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <Container>
        {pendingAccount ? (
          <div className="bg-gray-50 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{pendingAccount}</h3>
              <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                <div className="max-w-xl text-sm leading-5 text-gray-500">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatibus corrupti atque repudiandae nam.</p>
                </div>
                <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                  <span className="inline-flex rounded-md shadow-sm">
                    <button
                      onClick={handleOnClick}
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                    >
                      Allow
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h2>Nothing to review...</h2>
        )}
      </Container>
    </>
  );
}

export default Admin;
