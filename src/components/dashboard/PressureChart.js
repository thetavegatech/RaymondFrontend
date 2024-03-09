import { Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PressureChart = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example"
    },
    xaxis: {
      categories: [],
      labels: {
        show: false, // Set show to false to hide x-axis labels
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#F50555', '#6078ea', '#6094ea']
        // gradientToColors: [ '#e63946']
      }
    },
    tooltip: {
      theme: "dark"
    }
  });

  const [series, setSeries] = useState([
    {
      name: 'CurrentVFD',
      data: [],
    }
  ]);

  const fetchData = () => {
    axios.get("https://raymondbackend.onrender.com/api/mqttpressure")
      .then(response => {
        const values = response.data;
        
        // Divide each value in the array by 10
        const valuesDividedBy10 = values.map(value => value / 10);

        // Reverse the order of the array
        const reversedValues = valuesDividedBy10.reverse();

        setSeries([
          {
            name: 'CurrentVFD',
            data: reversedValues
          }
        ]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Air Feed Pressure</CardTitle>
        <Chart
          type="area"
          width="100%"
          height="392"
          options={options}
          series={series}
        />
      </CardBody>
    </Card>
  );
};

export default PressureChart;