import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import Chart from 'react-apexcharts';
import axios from "axios";

const Feeds = () => {
  const [mqttData, setMqttData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raymondbackend.onrender.com/api/mqttdata");
        const data = await response.json();
        setMqttData(data);
      } catch (error) {
        console.error("Error fetching MQTT data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect only once on component mount

  const temperature = mqttData.AirExstTemp || 0;
  const series =  [temperature - 50];

  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
      offsetY: -10
    },
    plotOptions: {
      radialBar: {
        startAngle: -110,
        endAngle: 110,
        dataLabels: {
          name: {
            fontSize: '2rem',
            color: "black",
            offsetY: 120,
          },
          value: {
            offsetY: 60,
            fontSize: '30px',
            color: undefined,
            formatter: function (val) {
              return val + "° C";
            },
          },
        },
      },
    },
    colors: ["#ff4e00"],
    stroke: {
      dashArray: 3,
      // color: ["#FF0000"]
    },
    labels: ['Temperature'],
  };

  return (
    <Card style={{ height: "470px" }}>
      <CardBody style={{ marginTop: "2rem" }}>
        <CardTitle tag="h5">Real Time Temperature</CardTitle>
        <Chart options={options} series={series} type="radialBar" height={350} />
      </CardBody>
    </Card>
  );
};

export default Feeds;
