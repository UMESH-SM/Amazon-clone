import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./SearchBox.css";

function SearchBox({
  value,
  setValue,
  searchProducts,
  setSearchProductId,
  setSelectedValue,
  handleSearch,
}) {
  let searchProductsLocal = searchProducts;
  const [suggestions, setSuggestions] = useState([]);

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");
    return searchProductsLocal
      .map((section) => {
        return {
          subcategory: section.subcategory,
          subcategoryItems: section.subcategoryItems.filter((item) =>
            regex.test(item.searchName)
          ),
        };
      })
      .filter((section) => section.subcategoryItems.length > 0);
  }

  function getAllPossibleSuggestions(value) {
    if (value.length < 2) {
      return [];
    }
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp(escapedValue, "i");
    return searchProductsLocal
      .map((section) => {
        return {
          subcategory: section.subcategory,
          subcategoryItems: section.subcategoryItems.filter((item) =>
            regex.test(item.searchName)
          ),
        };
      })
      .filter((section) => section.subcategoryItems.length > 0);
  }

  function getSuggestionValue(suggestion) {
    setSearchProductId(suggestion.id);
    return suggestion.searchName;
  }

  function renderSuggestion(suggestion) {
    return <span>{suggestion.searchName}</span>;
  }

  function renderSectionTitle(section) {
    return <strong>{section.subcategory}</strong>;
  }

  function getSectionSuggestions(section) {
    return section.subcategoryItems;
  }

  const onChange = (e, { newValue, method }) => {
    if (method === "click" || method === "down" || method === "up") {
      setSelectedValue(newValue);
    }
    setValue(newValue);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const resultList = getSuggestions(value);
    if (resultList.length !== 0) {
      setSuggestions(resultList);
    } else {
      setSuggestions(getAllPossibleSuggestions(value));
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "",
    value,
    onChange,
    onKeyPress,
  };

  return (
    <Autosuggest
      multiSection={true}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderSectionTitle={renderSectionTitle}
      getSectionSuggestions={getSectionSuggestions}
      inputProps={inputProps}
    />
  );
}

export default SearchBox;
