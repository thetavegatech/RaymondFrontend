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
      }
    },
    tooltip: {
      theme: "dark"
    }
  });

  const [series, setSeries] = useState([
    {
      name: 'Host A Phase Current',
      data: [],
    }
  ]);

  const fetchData = () => {
    axios.get("https://raymondbackend.onrender.com/api/mqttpressure")
      .then(response => {
        const { values, dates } = response.data;

        // Divide all values by 10
        const dividedValues = values.map(value => (value / 10).toFixed(1));

        // Reverse the order of the arrays
        const reversedValues = dividedValues.reverse();
        const formattedDates = dates.reverse().map(dateString => {
          const date = new Date(dateString);
          return date.toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        });

        setOptions({
          ...options,
          xaxis: {
            ...options.xaxis,
            categories: formattedDates,
          }
        });

        setSeries([
          {
            name: 'Air Feed Pressure',
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
        <CardTitle tag="h5">Air Feed Pressure Run Chart : For Current Day </CardTitle>
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