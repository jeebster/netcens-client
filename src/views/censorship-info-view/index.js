import { useEffect, useState } from "react";
import CensorshipInfoCard from "../../components/censorship-info-card";
import "./index.css";

const CensorshipInfoView = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countryData, setCountryData] = useState({});
  const [sortIdentifier, setSortIdentifier] = useState("default");

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch("https://api.ooni.io/api/_/countries");
        const deserializedResponse = await response.json();
        setCountryData(deserializedResponse);
      } catch (error) {
        setHasError(true);
      }

      setIsLoading(false);
    };

    fetchCountryData();
  }, []);

  const handleSortSelectorChange = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;

    // noop on default value
    if (value !== "default") {
      // noop unless new selection
      if (sortIdentifier !== value) {
        const [sortDirection] = value.match(/(?<=:)\w+/); // positive look-behind - match all word characters until delineator ":"
        const [sortProp] = value.match(/\w+(?=:)/); // positive look-ahead - match all word characters until delineator ":"

        setSortIdentifier(value);
        setCountryData((prevState) => {
          return {
            countries: prevState.countries.sort((a, b) => {
              const aVal = a[sortProp];
              const bVal = b[sortProp];
              if (typeof aVal === "number" && typeof bVal === "number") {
                return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
              } else if (typeof aVal === "string" && typeof bVal === "string") {
                return sortDirection === "asc"
                  ? aVal.localeCompare(bVal)
                  : bVal.localeCompare(aVal);
              } else {
                return 0; // noop
              }
            }),
          };
        });
      }
    }
  };

  const renderError = () => (
    <div>There was an error fetching data, please try again.</div>
  );

  const renderLayout = () => (hasError ? renderError() : renderCountryData());

  const renderLoader = () => <div className="loader">Loading...</div>;

  const renderCountryData = () => (
    <>
      <div className="space-btm">{rendersortSelector()}</div>
      <div className="grid-container">
        {countryData.countries.map((data) => (
          <CensorshipInfoCard key={data.alpha_2} {...data} />
        ))}
      </div>
    </>
  );

  const rendersortSelector = () => (
    <select
      value={sortIdentifier}
      onChange={(e) => handleSortSelectorChange(e)}
    >
      <option value="default" disabled>
        Sort by...
      </option>
      <option value="name:asc">Country Name &#8593;</option>
      <option value="name:desc">Country Name &#8595;</option>
      <option value="count:asc">Measurements &#8593;</option>
      <option value="count:desc">Measurements &#8595;</option>
    </select>
  );

  return (
    <div className="csiv-container">
      {isLoading ? renderLoader() : renderLayout()}
    </div>
  );
};

export default CensorshipInfoView;
