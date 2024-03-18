import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import CustomizedMenus from "../Components/Filterbutton";
import { DataContext } from "../Components/Dashboard";
function LineChart() {
  const data = useContext(DataContext);
  
  const [compareCountries, setCompareCountries] = useState([
    "Russia",
    "India",
    "United States of America",
    "China",
  ]);
  const targetVariables = ["intensity", "relevance", "likelihood"];
  const [targetVariable, setTargetVariable] = useState("intensity");
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
      "#1768AC",
      "#ac4cfe",
      "#EF709D",
      "#f3ba2f",
      "#2a71d0",
    ];

    const filteredDatasets = compareCountries.map((country,index) => {
      // Build the filter condition based on all feature values
      const filterCondition = (item) => {
        // Check if all feature values are not null and match the corresponding values in the item object
        let condition =
          item.country === country &&
          (features.topic === null || item.topic === features.topic) &&
          (features.pestle === null || item.pestle === features.pestle) &&
          (features.sector === null || item.sector === features.sector) &&
          (features.source === null || item.source === features.source) &&
          (features.end_year === null || item.end_year === features.end_year);

        // Add more checks for other features here...
        return condition;
      };

      return {
        label: country,
        data: data.filter(filterCondition).map((data) => data[targetVariable]),
        tension : 0.4,
        borderColor: colors[index % colors.length],
        // Adjust colors based on country
      };
    });

    const startYears = filteredDatasets.flatMap((dataset) => {
      return data
        .filter((item) => item.country === dataset.label && item.start_year!=="")
        .map((item) => item.start_year);
    });
    const uniqueStartYears = [...new Set(startYears)].sort();
    // Set chart data
    setChartData({
      labels: uniqueStartYears, // Replace yourLabelsHere with the appropriate labels
      datasets: filteredDatasets,
      borderColor: colors, // Apply colors based on index
      
      
      fill: false,
    });
  }, [compareCountries, features, targetVariable]);

  const options = {
    plugins: {
      title: {
          display: true,
          text: "Country's Performance",
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
          },

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
    
    <div>
      <select
        className="form-select"
        aria-label="Default select example"
        style={{ position: "absolute", width: "10vw", left:'10px', top:'10px', border:'1px solid blue' }}
        onChange={(event)=>setTargetVariable(event.target.value)}

      >

        {targetVariables.map((item)=><option>{item}</option>)}
        
      </select>
      <CustomizedMenus
        compare={compareCountries}
        features={features}
        setCompare={setCompareCountries}
        setFeatures={setFeatures}
        title="country"
      />

      <Line data={chartData} options={options} />
      </div>
    
  );
}

export default LineChart;
