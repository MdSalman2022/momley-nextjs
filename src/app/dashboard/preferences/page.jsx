import React from "react";

const Preferences = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <p className="font-semibold">Reports</p>
        <span className="text-[#BDBDBD] text-sm">
          Download and view your reports from the past 6 months{" "}
        </span>
      </div>

      <div className="flex flex-col gap-6 mb-10">
        <div className="border rounded p-6 grid grid-cols-2 gap-10 w-[80%]">
          <div className="flex flex-col gap-3 ">
            <p className="font-semibold">Title and meta description</p>
            <span>
              The title and meta description help define how your store shows up
              on search engines
            </span>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label htmlFor="" className="flex flex-col gap-2 w-full">
              <span>Homepage title</span>
              <div className="flex flex-col w-full">
                <input type="text" className="input-box w-full" />
                <span className="text-[#BDBDBD] text-sm">
                  0 of 70 characters used
                </span>
              </div>
            </label>
            <label htmlFor="" className="flex flex-col gap-2">
              <span>Homepage meta description</span>
              <div className="w-full">
                <textarea
                  className="input-box h-[98px] w-full"
                  name=""
                  id=""
                  placeholder="Enter a description to get a better ranking on search engines like Google"
                ></textarea>
                <span className="text-[#BDBDBD] text-sm">
                  0 of 320 characters used
                </span>
              </div>
            </label>
          </div>
        </div>
        <div className="border rounded p-6 grid grid-cols-2 gap-10 w-[80%]">
          <div className="flex flex-col gap-3 ">
            <p className="font-semibold">Google Analytics</p>
            <span>
              Google analytics enables you to track the visitors to your store,
              and generates reports that will help you with your marketing.
              Learn more about google analytics
            </span>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label htmlFor="" className="flex flex-col gap-2 w-full">
              <span>Google analytics account. (how do i set this up?)</span>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  className="input-box w-full"
                  placeholder="Pest your code from  Google here"
                />
              </div>
            </label>
            <label htmlFor="" className="flex flex-col gap-2">
              <span>Enhanced Ecommerce</span>
              <div className="w-full">
                <textarea
                  className="input-box h-[98px] w-full"
                  name=""
                  id=""
                  placeholder="You must upgrade to the latest version of Google analytics in order to use Enhanced Ecommerce"
                ></textarea>
                <span className="text-[#BDBDBD] text-sm">
                  0 of 320 characters used
                </span>
              </div>
            </label>
          </div>
        </div>
        <div className="border rounded p-6 grid grid-cols-2 gap-10 w-[80%]">
          <div className="flex flex-col gap-3 ">
            <p className="font-semibold">Facebook Pixel</p>
            <span>
              Google analytics enables you to track the visitors to your store,
              and generates reports that will help you with your marketing.
              Learn more about Facebook Pixes
            </span>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label htmlFor="" className="flex flex-col gap-2 w-full">
              <span>
                Connect your pixel with the Facebook app. The app ensures proper
                setup, while enabling advanced traking options and others
                features that help you target new and existing customer.
              </span>
              <button className="primary-btn">Set up Facebook</button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
