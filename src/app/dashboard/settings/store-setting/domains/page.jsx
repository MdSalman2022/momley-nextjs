import React from "react";

const Domains = () => {
  const customDomains = [{ name: "store.example.com" }];

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="">Set up and personalize your store’s web address.</p>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-1 text-sm px-4 border-b">Domain Name</th>
            <th className="py-1 text-sm px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {customDomains.map((domain, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{domain.name}</td>
              <td className="py-2 px-4 border-b text-center">
                <button className=" hover:underline">Remove Domain</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Domains;
