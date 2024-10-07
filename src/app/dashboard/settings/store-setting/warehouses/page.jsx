import React from "react";

const Warehouse = () => {
  const warehouses = [
    { location: "New York", type: "Primary" },
    { location: "Los Angeles", type: "Secondary" },
    // Add more warehouse details as needed
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">
          Organize and oversee your inventory storage details.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Warehouse
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {warehouses.map((warehouse, index) => (
          <div key={index} className="border p-4 rounded shadow-sm bg-white">
            <p className="text-md font-semibold">
              Location: {warehouse.location}
            </p>
            <p className="text-sm text-gray-600">Type: {warehouse.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Warehouse;
