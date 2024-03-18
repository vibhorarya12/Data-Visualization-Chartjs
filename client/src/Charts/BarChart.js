import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import CustomizedMenus from "../Components/Filterbutton";
import { DataContext } from "../Components/Dashboard";
function BarChart() {
  const data = useContext(DataContext);
  const [compareRegion, setCompareRegion] = useState([
    "Southern Asia",
    "Northern America",
    "Eastern Europe",
    "South America",
  ]);
  const targetVariables = ["relevance", "intensity", "likelihood"];
  const [targetVariable, setTargetVariable] = useState("relevance");
  const [features, setFeatures] = useState({
    topic: null,
    sector: null,
    source: null,
    pestle: null,
    end_year: null,
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const colors = [
      "rgba(75,192,192,1)",
      "#ac4cfe",
      "#EF709D",
      "#f3ba2f",
      "#2a71d0",
    ];

    const filteredDatasets = compareRegion.map((region, index) => {
      // Build the filter condition based on all feature values
      const filterCondition = (item) => {
        // Check if all feature values are not null and match the corresponding values in the item object
        let condition =
          region &&
          item.region === region &&
          (features.topic === null || item.topic === features.topic) &&
          (features.pestle === null || item.pestle === features.pestle) &&
          (features.sector === null || item.sector === features.sector) &&
          (features.source === null || item.source === features.source) &&
          (features.end_year === null || item.end_year === features.end_year)  ;

        // Add more checks for other features here...
        return condition;
      };

      return {
        label: region,
        data: data.filter(filterCondition).map((data) => data[targetVariable]),
        // Assign unique background color to each dataset
        backgroundColor: colors[index % colors.length],
        // Adjust colors based on country
      };
    });
    if(filteredDatasets.length===0){
      window.alert("no records found");
    }

    const startYears = filteredDatasets.flatMap((dataset) => {
      return data
        .filter((item) => item.region === dataset.label && item.start_year!=="")
        .map((item) => item.start_year);
    });
    const uniqueStartYears = [...new Set(startYears)].sort();
    // Set chart data
    setChartData({
      labels: uniqueStartYears, // Replace yourLabelsHere with the appropriate labels
      datasets: filteredDatasets,
      borderWidth: 3,
      fill: false,
    });
  }, [compareRegion, features, targetVariable]);

  const options = {
    plugins: {
      title: {
          display: true,
          text: "Region's Performance",
          font: {
            size: 18, // Adjust the font size as needed
            // You can also adjust other font properties
          },
      }
  },
    scales: {
      x: {
        display: true, // Hide X-axis labels
        title : {
          display:true,
          text : 'start year',
          font: {
            size: 19, // Adjust the font size as needed
            weight: 'bold', // You can also adjust other font properties
          }
  
        }
      },
      y: {
        display: true, // Hide X-axis labels
        title : {
          display:true,
          text : targetVariable,
          font: {
            size: 19, // Adjust the font size as needed
            weight: 'bold', // You can also adjust other font properties
          }
  
        }
      },
    },
    
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 10,
      },
    },
  };

  return (
    <>
      {" "}
      <select
        className="form-select"
        aria-label="Default select example"
        style={{
          position: "absolute",
          width: "10vw",
          left: "10px",
          top: "10px",
          border:'1px solid blue' 
        }}
        onChange={(event) => setTargetVariable(event.target.value)}
      >
        {targetVariables.map((item) => (
          <option>{item}</option>
        ))}
      </select>
      <CustomizedMenus
        compare={compareRegion}
        features={features}
        setCompare={setCompareRegion}
        setFeatures={setFeatures}
        title="region"
      />{" "}
      <Bar data={chartData} options={options} />
    </>
  );
}

export default BarChart;
