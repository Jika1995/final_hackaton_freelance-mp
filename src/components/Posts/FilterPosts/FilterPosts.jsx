import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

//custom
import { usePosts } from "../../../contexts/PostContextProvider";
import { useSearchParams } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const FilterPosts = () => {
  const { fetchByParams } = usePosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getPosts } = usePosts();

  useEffect(() => {
    getPosts();
  }, [searchParams]);

  const [sort, setSort] = useState("");

  // const handleChange = (e) => {
  //   setSort(e.target.value);
  // };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        {/* <FormControl variant="standard" sx={{ m: 1, width: 180 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Sort by:
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sort}
            onChange={(e) => {
              fetchByParams("ordering", e.target.value);
              // handleChange(e.target.value);
            }}
            label="Sort by:"
          >
            <MenuItem value={"all"} key="-1">
              All
            </MenuItem>
            <MenuItem value={"-price"} key="1">
              Price: High to Low
            </MenuItem>
            <MenuItem value={"price"} key="2">
              Price: Low to High
            </MenuItem>
            <MenuItem value={"comments"} key="3">
              Most Comments
            </MenuItem>
            <MenuItem value={"-comments"} key="4">
              Less Comments
            </MenuItem>
            <MenuItem value={"title"} key="5">
              A-B
            </MenuItem>
          </Select>
        </FormControl> */}
        <FormLabel id="demo-radio-buttons-group-label" className="label-filter">
          Filter by:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
          onChange={(e) => fetchByParams("ordering", e.target.value)}
          className="radio-btns"
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="Filter reset"
          />
          <FormControlLabel value="title" control={<Radio />} label="A-B " />
          <FormControlLabel value="-title" control={<Radio />} label="B-A " />
          <FormControlLabel
            value="-price"
            control={<Radio />}
            label="Expensive "
          />
          <FormControlLabel value="price" control={<Radio />} label="Cheap " />
          <FormControlLabel
            value="likes"
            control={<Radio />}
            label="More Likes"
          />
          <FormControlLabel
            value="-likes"
            control={<Radio />}
            label="Less Likes"
          />
          <FormControlLabel
            value="comments"
            control={<Radio />}
            label="More comments"
          />
          <FormControlLabel
            value="-comments"
            control={<Radio />}
            label="Less Comments"
          />
        </RadioGroup>
      </div>
    </ThemeProvider>
  );
};

export default FilterPosts;
