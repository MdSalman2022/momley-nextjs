import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { useQuery } from "react-query";
import { storeId } from "@/libs/utils/common";

const useLocationData = (userInfo, setValue) => {
  const [allCity, setAllCity] = useState([]);
  const [allArea, setAllArea] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const shippingAddress = userInfo?.customer?.shippingAddress[0] || {};

  console.log("shippingAddress", shippingAddress);
  console.log("shippingAddress?.division", shippingAddress?.division);
  const { GetAddress } = useUser();
  const [completeAddress, setCompleteAddress] = useState({
    division: "",
    city: "",
    area: "",
    address: "",
  });

  const {
    data: allDivisions = [],
    isLoading: isDivisionLoading,
    refetch: refetchDivisions,
  } = useQuery({
    queryKey: ["allDivisions", storeId],
    queryFn: () => storeId && GetAddress(),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  useEffect(() => {
    if (allDivisions?.length > 0 && shippingAddress?.division !== "") {
      const divisionId = allDivisions.find(
        (division) => division.name === shippingAddress?.division
      )?.id;
      console.log("divisionId", divisionId);
      setValue("division", shippingAddress?.division);
      const fetchCities = async (divisionId) => {
        if (divisionId) {
          const cities = await GetAddress(divisionId);
          console.log("cities", cities);
          if (cities?.length > 0) {
            setAllCity(cities);
          }
        }
      };

      fetchCities(divisionId);
    }
  }, [allDivisions]);
  console.log("allCity", allCity);

  useEffect(() => {
    if (allCity?.length > 0 && shippingAddress?.city !== "") {
      const cityId = allCity.find(
        (city) => city.name === shippingAddress?.city
      )?.id;
      setValue("city", shippingAddress?.city);
      console.log("cityId", cityId);
      const fetchCities = async (cityId) => {
        if (cityId) {
          const areas = await GetAddress(cityId);
          console.log("areas", areas);
          if (areas?.length > 0) {
            setAllArea(areas);
            setValue("area", shippingAddress?.area);
            setValue("address", shippingAddress?.address);
          }
        }
      };

      fetchCities(cityId);
    }
  }, [allCity]);

  console.log("allArea", allArea);

  const handleDivisionSelect = async (value) => {
    console.log("division value", value);
    const selectedDivisionName = allDivisions.find(
      (division) => division.id === value
    )?.name;
    setSelectedDivision(selectedDivisionName);
    setValue("division", selectedDivisionName);

    if (value) {
      const cities = await GetAddress(value);
      console.log("cities", cities);
      if (cities?.length > 0) {
        setValue("city", cities[0].name);
        setSelectedCity(cities[0].name);
        setAllCity(cities);
      }
    }
  };
  console.log("completeAddress", completeAddress);
  console.log("completeAddress state", completeAddress?.state);

  const handleCitySelect = async (value) => {
    const selectedCityName = allCity.find((city) => city.id === value)?.name;

    setSelectedCity(selectedCityName);
    setValue("city", selectedCityName);
    const areas = await GetAddress(value);
    if (areas?.length > 0) {
      setValue("area", areas[0].name);
      setSelectedArea(areas[0].name);
      setAllArea(areas);
    }
  };

  const handleAreaSelect = (value) => {
    const selectedAreaName = allArea.find((area) => area.id === value)?.name;

    console.log("selectedAreaName", selectedAreaName);
    if (selectedAreaName !== undefined) {
      setSelectedArea(selectedAreaName);
      setValue("area", selectedAreaName);
    }
  };

  console.log("allCity", allCity);

  return {
    allCity,
    allArea,
    completeAddress,
    allDivisions,
    isDivisionLoading,
    shippingAddress,
    handleDivisionSelect,
    handleCitySelect,
    handleAreaSelect,
    selectedDivision,
    selectedCity,
    selectedArea,
  };
};

export default useLocationData;
