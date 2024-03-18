import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import ResponsiveAppBar from "./Navbar";
import "../mystyle.css";
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import PolarareaChart from "../Charts/PolarareaChart";
import HorizontalBar from "../Charts/HorizontalBar";
import black from "../assets/black.png";
import DataSaverOffSharpIcon from "@mui/icons-material/DataSaverOffSharp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShowChartSharpIcon from "@mui/icons-material/ShowChartSharp";
import SpeedSharpIcon from "@mui/icons-material/SpeedSharp";
import TroubleshootSharpIcon from "@mui/icons-material/TroubleshootSharp";
import Divider from "@mui/material/Divider";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import SkeletonChildren from "./Loaders/Skeletons";
export const DataContext = createContext("");
function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navs = ["Dashboard", "Analytics", "Performance", "Metrics", "About"];
  const icons = [
    <ShowChartSharpIcon />,
    <DataSaverOffSharpIcon />,
    <SpeedSharpIcon />,
    <TroubleshootSharpIcon />,
    <InfoSharpIcon />,
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.REACT_APP_API_KEY);
        setData(response.data);
       
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <DataContext.Provider value= {data}>
      <div className="main-container">
        <div className="side-bar">
          <div className="logo-container">
            <img className="logo" src={black} alt="abcd" />
          </div>
          <Divider />
          <List>
            {navs.map((text, index) => (
              <ListItem key={text}>
                <ListItemButton>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <div className="chart-container">
          <ResponsiveAppBar />
          <div className="chart-box">
            {loading ? <SkeletonChildren /> : <LineChart />}
          </div>
          <div className="chart-box">
            {loading ? <SkeletonChildren /> : <BarChart />}
          </div>
          <div className="dual-charts">
            <div className="horizontal-chart">
              {loading ? <SkeletonChildren /> : <HorizontalBar />}
            </div>
            <div className="polar-chart">
              {loading ? <SkeletonChildren /> : <PolarareaChart />}
            </div>
          </div>
        </div>
      </div>
      </DataContext.Provider>
    </>
  );
}

export default Dashboard;
