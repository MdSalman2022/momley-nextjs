import React from "react";

const MyOrder = () => {
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <p className="font-medium">My Order</p>
        <button className="primary-btn">Save and Change</button>
      </div>
      <div className="border bg-white p-5 rounded flex flex-col gap-5">
        <div className="flex gap-5">
          <p className="pb-2 border-b-2 border-black">All</p>
          <p>Unpaid</p>
          <p>Shipping</p>
          <p>Completed</p>
          <p>Cancellation</p>
          <p>Return/Refund</p>
        </div>
        <div className="flex gap-6 items-center">
          <input
            type="text"
            className="input-box"
            placeholder="Search products name, ID"
          />
          <input
            type="text"
            className="input-box"
            placeholder="Payments Status"
          />
          <button className="primary-btn">Search</button>
        </div>
        <p>02 Orders</p>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox" />
                    <p className="text-sm">Order ID</p>
                  </label>
                </th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Partial Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox" />
                    <p className="text-sm font-normal">SU 12 34 56</p>
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <p className="text-sm">22/05/2021</p>
                  </div>
                </td>
                <td>
                  <span>850</span>
                </td>
                <td>Paid</td>
                <th>
                  <button className="text-blue-500 font-normal">
                    Processing
                  </button>
                </th>
              </tr>
              {/* row 2 */}
              <tr>
                <th>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox" />
                    <p className="text-sm font-normal">SU 12 34 56</p>
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <p className="text-sm">22/05/2021</p>
                  </div>
                </td>
                <td>
                  <span>900</span>
                </td>
                <td>COD</td>
                <th>
                  <button className="text-green-500 font-normal">
                    Delivery
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
