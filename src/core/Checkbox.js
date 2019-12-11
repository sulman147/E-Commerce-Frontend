import React, { useState, useEffect } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Checkboxc = ({ categories, handleFilters }) => {
  const [checked, setchecked] = useState([]);
  const handleToggle = c => () => {
    const currentCategoryId = checked.indexOf(c); //return the first index or-1
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    //console.log(newCheckedCategoryId);
    setchecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };
  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleToggle(c._id)}
              value={checked.indexOf(c._id === -1)}
              color="primary"
            />
          }
          label={c.name}
        />
      </FormGroup>
    </li>
  ));
};

export default Checkboxc;
