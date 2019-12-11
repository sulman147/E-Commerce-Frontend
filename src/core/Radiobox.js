import React, { useState, useEffect, Fragment } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);
  const handleChange = event => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };
  return prices.map((p, i) => (
    <div key={i}>
      <FormControl component="fieldset">
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel
            value={`${p._id}`}
            control={<Radio color="primary" />}
            label={p.name}
          />
        </RadioGroup>
      </FormControl>
    </div>
  ));
};

export default RadioBox;
