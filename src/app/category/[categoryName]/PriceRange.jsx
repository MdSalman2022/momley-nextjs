import React, { useState } from "react";

const PriceRange = ({
  priceRange,
  setPriceRange,
  handleSearch,
  query,
  params,
}) => {
  const handleFilterPrice = () => {
    // Implement the logic to filter items based on the price range
    console.log(
      `Filtering items with price between ${priceRange.min} and ${priceRange.max}`
    );
    // Example: setFilterItems(filteredItems);

    handleSearch("price", priceRange);
  };

  const handleMinPriceChange = (e) => {
    setPriceRange((prevRange) => ({
      ...prevRange,
      min: e.target.value,
    }));
  };

  const handleMaxPriceChange = (e) => {
    setPriceRange((prevRange) => ({
      ...prevRange,
      max: e.target.value,
    }));
  };

  return (
    <div className="price-range-filter flex flex-col items-center gap-1">
      <div className="form-control w-full mt-1">
        <label className="flex flex-col">
          <span className="label-text text-xs">Min Price:</span>
          <input
            type="number"
            value={priceRange.min}
            onChange={handleMinPriceChange}
            className="input-box w-full text-xs"
            placeholder="Min Price"
          />
        </label>
      </div>
      <div className="form-control w-full">
        <label className="flex flex-col">
          <span className="label-text text-xs">Max Price:</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={handleMaxPriceChange}
            className="input-box w-full text-xs"
            placeholder="Max Price"
          />
        </label>
      </div>
      <div className="form-control py-3">
        <button onClick={handleFilterPrice} className="primary-btn text-xs">
          Apply
        </button>
      </div>
    </div>
  );
};

export default PriceRange;
