import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Chip from "@mui/material/Chip";
import Tooltip from '@mui/material/Tooltip';
import "../App.css";
import { DataContext } from "./Dashboard";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus({
  compare,
  setCompare,
  features,
  setFeatures,
  title,
}) {
   const data = React.useContext(DataContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (country) => {
    setCompare((prevCountries) => prevCountries.filter((c) => c !== country));
  };

  const handleSelectChange = (event, key) => {
    //placing a check for end_year to be a number //
    const selectedValue =   key==='end_year'?parseInt(event.target.value):event.target.value;

    setFeatures((prevState) => ({
      ...prevState,
      [key]: selectedValue,
    }));
  };

  return (
    <div style={{ position: "absolute", right:'10px', top:'10px'}}>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Filter
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div className="filter-buttons">
          {compare.map((item) => (
            <Chip label={`${item}`} onDelete={() => handleDelete(item)}  sx={{bgcolor:'#1976d2', width:'10vw', color:'white'}}/>
          ))}
          <Tooltip title={`compare ${title}`}>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(event) => {
              const selectedValue = event.target.value;
              if (!compare.includes(selectedValue) && compare.length < 5) {
                setCompare((prevCompare) => [...prevCompare, selectedValue]);
              }
            }}
            disabled={compare.length >= 5}
            style={{width:'10vw'}}
            
          >
            <option selected>{ compare.length===5?<p style={{color:'red'}}>Max 5 allowed</p>:title}</option>
            {Array.from(new Set(data.map((item) => item[title])))
              .sort()
              .map((items) => (
                <option>{items}</option>
              ))}
          </select>
          </Tooltip>
          {Object.entries(features).map(([key, value]) => (
            <Tooltip title={key}>
            <select
              key={key}
              className="form-select"
              aria-label="Default select example"
              onChange={(event) => handleSelectChange(event, key)}
              style={{width:'10vw'}}
            >
              <option selected>{value?value:key}</option>
              {Array.from(new Set(data.map((item) => item[key])))
                .sort()
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
            </Tooltip>
          ))}
        </div>
      </StyledMenu>
    </div>
  );
}
