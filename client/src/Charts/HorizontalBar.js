import React, { useState, useContext } from 'react';
import { Bar } from "react-chartjs-2";
import { DataContext } from "../Components/Dashboard";

export default function HorizontalBar() {
    const data = useContext(DataContext);
    // State to hold the selected country
    const [selectedCountry, setSelectedCountry] = useState("Russia");

    // Filter data based on the selected country
    const filteredData = data.filter((item) => item.country === selectedCountry && item.sector !== "");
    

    // Extract unique sector values from the filtered data
    const uniqueSectors = Array.from(new Set(filteredData.map((item) => item.sector).filter((sector) => sector !== "")));

    // Chart data
    const chartData = {
        labels: uniqueSectors,
        datasets: [{
            label: selectedCountry,
            data: filteredData.map((item) => item["relevance"]),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ac4cfe",
                "#EF709D",
                "#f3ba2f",
                "#2a71d0",
                "#FF570A",
            ],
        }]
    };

    // Options for the chart
    const options = {
        maxBarThickness:35,
        plugins: {
            title: {
                display: true,
                text: "Country's Sector-wise Relevance"
            }
        },
        indexAxis: 'y',
        scales: {
            x: {
                display: true, // Show X-axis labels
            },
            y: {
                display: true, // Show Y-axis labels
            },
        },
        layout: {
            padding: {
                
                left:20,
                bottom :10
            },
        },
    };

    return (
        <>
            {/* Dropdown menu for selecting country */}
            <select className="form-select"
        style={{width:'12vw', border:'1px solid blue' }} value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                {/* Map over unique country values and create options */}
                {Array.from(new Set(data.map((item) => item.country))).sort().map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>

            {/* Render the bar chart */}
            <Bar data={chartData} options={options} />
        </>
    );
}
