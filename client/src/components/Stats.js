import React, { useContext, useEffect, useState } from "react";

import EthContext from "../EthContext";

function Stats() {
  const eth = useContext(EthContext);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const init = async () => {
      const { accounts, tokenInstance } = eth;
      const tokens = await tokenInstance.methods.balanceOf(accounts[0]).call();
      setTokens(tokens);
    };
    init();
  }, [eth]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-3xl mx-auto">
        <div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div className="border border-gray-200 rounded shadow">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-base leading-6 font-normal text-gray-900">Your Remaining Tokens</dt>
                  <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                    <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                      {tokens}
                      <span className="ml-2 text-sm leading-5 font-medium text-gray-500">OKH</span>
                    </div>
                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-gray-100 text-green-800 md:mt-2 lg:mt-0">
                      <span className="sr-only">Increased by</span>
                      Ready to Invest
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="border border-gray-200 rounded shadow">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-base leading-6 font-normal text-gray-900">Your Balance</dt>
                  <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                    <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                      ???
                      <span className="ml-2 text-sm leading-5 font-medium text-gray-500">OKH ~ $50 USD</span>
                    </div>
                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                      <svg
                        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Increased by</span>
                      12.4%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
