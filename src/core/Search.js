import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

        <div className="row">
          {results.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    // <form onSubmit={searchSubmit}>
    <span className="input-group-text">
      <div className="input-group input-group-lg">
        <FormControl style={{ width: "20%", paddingLeft: "10px" }}>
          <InputLabel
            id="demo-simple-select-label"
            style={{
              paddingLeft: "10px"
            }}
          >
            Select Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ marginRight: "20px", width: "140px", paddingLeft: "10px" }}
            // value={age}
            onChange={handleChange("category")}
          >
            {categories.map((c, i) => (
              <MenuItem key={i} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          style={{ width: "80%", backgroundColor: "white" }}
          id="outlined-search"
          onChange={handleChange("search")}
          // value={email}
          label="Search by name"
          type="search"
          variant="outlined"
        />
        {/* <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          /> */}
      </div>
      <div className="btn input-group-append" style={{ border: "none" }}>
        <Button
          // onSubmit={searchSubmit}
          size="large"
          onClick={searchSubmit}
          className="input-group-text"
          variant="outlined"
          color="primary"
        >
          Search
        </Button>
      </div>
    </span>
    // </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
