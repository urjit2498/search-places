import React, { useEffect } from "react";
import "../styles/SearchInput.css";
const SearchInput = ({onSearch, searchTerm, setSearchTerm}) => {
  const searchInputRef = React.createRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "/") {
        searchInputRef.current.focus();
        event.preventDefault(); 
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchInputRef]);

  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          ref={searchInputRef}
          className="search-input"
          type="text"
          placeholder="Search places..."
          value={searchTerm}
          onChange={handleChange}
        />
        <div className="shortcut">
          <span>Ctrl+/</span>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
