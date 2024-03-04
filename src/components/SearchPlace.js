import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import CustomTable from "../components/CustomTable";
import { Api } from "../api";
import '../styles/SearchPlace.css'
const SearchPlace = () => {
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchTerm !== "") {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);
  const handleSearch = () => {
    setLoading(true);
    Api.getCities(`/cities`, searchTerm)
      .then((data) => {
        setSearchedData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  const handlePageChange = (page) => {
    console.log("page: ", page);
    setLoading(true);
    Api.getCities(`/cities`, searchTerm, page)
      .then((data) => {
        setSearchedData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  return (
    <div className="mainContainer">
      <SearchInput
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CustomTable
        data={searchedData}
        loading={loading}
        error={error}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPlace;
