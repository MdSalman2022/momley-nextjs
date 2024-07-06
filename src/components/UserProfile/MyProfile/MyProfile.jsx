import React from "react";

const MyProfile = () => {
  return (
    <form>
      <div className="flex justify-between">
        <p className="font-medium">Personal Info</p>
        <button className="primary-btn">Save and Change</button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-end gap-5">
          <img src="img/profileImg.png" alt="" />
          <div className="flex flex-col gap-3">
            <p className="font-medium">Profile Photo</p>
            <button className="primary-btn text-sm">Choose a file</button>
          </div>
        </div>
        <div className="p-5 border bg-white rounded">
          <div className="grid md:grid-cols-3 gap-y-5 ">
            <label htmlFor="">
              <p>Full Name*</p>
              <input
                type="text"
                className="input-box"
                placeholder="Your Name"
              />
            </label>
            <label htmlFor="">
              <p>Phone Number*</p>
              <input
                type="text"
                className="input-box"
                placeholder="Your Name"
              />
            </label>
            <label htmlFor="">
              <p>Email Address*</p>
              <input
                type="text"
                className="input-box"
                placeholder="Your Name"
              />
            </label>
            <label htmlFor="">
              <p>Birthday</p>
              <input
                type="text"
                className="input-box"
                placeholder="Your Name"
              />
            </label>
            <label htmlFor="">
              <p>Gender*</p>
              <input
                type="text"
                className="input-box"
              placeholder="Your Name"
              />
            </label>
          </div>
        </div>
        <p className="font-medium">Address Info</p>
        <div className="p-5 border bg-white rounded">
          <div className="grid md:grid-cols-3 gap-y-5 ">
            <label htmlFor="">
              <p>Region*</p>
              <input
                type="text"
                className="input-box"
                placeholder="Your Name"
              />
            </label>
            <label htmlFor="">
              <p>City*</p>
              <input
                type="text"
                className="input-box"
                placeholder="Your Name"
              />
            </label>
            <label htmlFor="">
              <p>Area*</p>
              <input
                type="text"
                className="input-box"
                placeholder="Your Name"
              />
            </label>
            <label htmlFor="">
              <p>Address</p>
              <input
                type="text"
                className="input-box"
                placeholder="Your Name"
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyProfile;
