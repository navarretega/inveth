import React, { useContext } from "react";

import EthContext from "../EthContext";

function Kyc(props) {
  const eth = useContext(EthContext);

  async function handleOnSubmit(e) {
    e.preventDefault();
    const { accounts, kycInstance } = eth;
    // Only the owner can do this!!! (set a diff UI)
    await kycInstance.methods.setKycCompleted(accounts[0]).send({ from: accounts[0] });
    props.setIsVerified(true);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <h1 className="text-xl leading-6 font-bold text-gray-900">Before buying tokens, please fill in your information</h1>
      <div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p className="mt-1 text-sm leading-5 text-gray-500">We need to know more about yourself.</p>
          </div>
          <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
                First name
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input id="first_name" className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
                Last name
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input id="last_name" className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Email address
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  type="email"
                  className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-5 text-gray-700">
                Country / Region
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <select id="country" className="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="street_address" className="block text-sm font-medium leading-5 text-gray-700">
                Street address
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="street_address"
                  className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium leading-5 text-gray-700">
                City
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input id="city" className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-5 text-gray-700">
                State / Province
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input id="state" className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="zip" className="block text-sm font-medium leading-5 text-gray-700">
                ZIP / Postal
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input id="zip" className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Verification</h3>
            <p className="mt-1 text-sm leading-5 text-gray-500">We need you to verify your identity.</p>
          </div>
          <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="income" className="block text-sm font-medium leading-5 text-gray-700">
                Monthly Income
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  $
                </span>
                <input
                  id="income"
                  className="flex-1 form-input block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="ocupation" className="block text-sm font-medium leading-5 text-gray-700">
                Ocupation
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <textarea
                  id="ocupation"
                  rows="3"
                  className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                ></textarea>
              </div>
              <p className="mt-2 text-sm text-gray-500">Tell us about your job.</p>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="docs" className="block text-sm leading-5 font-medium text-gray-700">
                Upload an oficial document (licence card, certificates)
              </label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                    >
                      Upload a file
                    </button>
                    <span> or drag and drop</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
            <p className="mt-1 text-sm leading-5 text-gray-500">
              We'll always let you know about important changes, but you pick what else you want to hear about.
            </p>
          </div>
          <div className="mt-6">
            <fieldset>
              <legend className="text-base font-medium text-gray-900">By Email</legend>
              <div className="mt-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="comments"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-5">
                    <label htmlFor="comments" className="font-medium text-gray-700">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="candidates"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-5">
                      <label htmlFor="candidates" className="font-medium text-gray-700">
                        Candidates
                      </label>
                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="offers"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-5">
                      <label htmlFor="offers" className="font-medium text-gray-700">
                        Offers
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
              <p className="text-sm leading-5 text-gray-500">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    id="push_everything"
                    name="form-input push_notifications"
                    type="radio"
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor="push_everything" className="ml-3">
                    <span className="block text-sm leading-5 font-medium text-gray-700">Everything</span>
                  </label>
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    id="push_email"
                    name="form-input push_notifications"
                    type="radio"
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor="push_email" className="ml-3">
                    <span className="block text-sm leading-5 font-medium text-gray-700">Same as email</span>
                  </label>
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    id="push_nothing"
                    name="form-input push_notifications"
                    type="radio"
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor="push_nothing" className="ml-3">
                    <span className="block text-sm leading-5 font-medium text-gray-700">No push notifications</span>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 pt-5">
        <div className="flex justify-end">
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </span>
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Save
            </button>
          </span>
        </div>
      </div>
    </form>
  );
}

export default Kyc;
