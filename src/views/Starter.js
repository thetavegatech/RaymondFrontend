import { Col, Row, Table } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";

import axios from "axios";
import { useState, useEffect } from "react";

const Starter = () => {
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

  const runstate1 = mqttData?.RunState1;
  let binaryArray = []

  if (runstate1 !== undefined) {
     binaryArray = runstate1.toString(2).padStart(16, '0').split('').reverse();
  
  } else {
    console.error('mqttData or RunState1 is undefined');
  }
  

  const runstate2 = mqttData?.RunState2;
  let binaryArray2 = []

  if(runstate2 !== undefined){
    binaryArray2 = runstate2.toString(2).padStart(16, '0').split('').reverse();
     console.log(binaryArray2)
  }else{
    console.log("Mqtt Data or RunState  is undefined")
  }



  // let BitValue = runState1Binary[runstate1];
  // console.log(BitValue)

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Air Feed Pressure"
            // earning={data.DisPr / 10 + " Bar"}
            earning={mqttData.AirFeedPre / 10 +  " Bar"}
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Temperature"
            earning={mqttData.AirExstTemp - 50 + "°"}
            icon="bi bi-thermometer-high"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Run Time Hours"
            earning={mqttData.RunTime + "Hr"}
            icon="bi bi-hourglass"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Load Time in Hours"
            earning={mqttData.LoadTime + " Hr"}
            icon="bi bi-hourglass"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Sales"
            subtitle="Host A phase Current "
            earning={mqttData.HostAPhCur / 10 + "A"}
            icon="bi bi-lightning"
          />
        </Col>
        {/* <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-primary text-primary"
            title="Sales"
            subtitle="Run State 1"
            earning={mqttData.RunState1}
            icon="bi bi-hourglass"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-black"
            title="Sales"
            subtitle="Run State 2"
            earning={mqttData.RunState2}
            icon="bi bi-hourglass"
            // color={data.RemOFCT < 100 ? "text-danger" : "text-black"}
          />
        </Col> */}
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Sales"
            subtitle="Oil Filter used time "
            earning={mqttData.OilfilterT + " Hr"}
            icon="bi bi-hourglass"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Oil Separator used time"
            earning={mqttData.OilSepTime + " Hr"}
            icon="bi bi-hourglass"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Sales"
            subtitle="Air Filter used time "
            earning={mqttData.AirFiltTIme + " Hr"}
            icon="bi bi-hourglass"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Lube oil used time"
            earning={mqttData.LubeOilTime + " Hr"}
            icon="bi bi-hourglass"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Sales"
            subtitle="Lube grease used time "
            earning={mqttData.LubeGreaseT + " Hr"}
            icon="bi bi-hourglass"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="6">  
        <Table bordered style={{ border: '1px solid black' }}>
      <thead style={{ borderBottom: '1px solid black' }}>
        <tr>
          <th>Run State 1</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Load Status</td>
          <td style={{ color: binaryArray[0] === '1' ? 'red' : 'green', fontWeight:"bold" }}>
            {binaryArray[0] === '1' ? 'Unload' : 'Load'}
          </td>
        </tr>
        <tr>
          <td>Run Status</td>
          <td style={{ color: binaryArray[1] === '1' ? 'red' : 'green' , fontWeight:"bold" }}>
            {binaryArray[1] === '1' ? 'Stop' : 'Run'}
          </td>
        </tr>
        <tr>
          <td>Air Exhaust temperature</td>
          <td style={{ color: binaryArray[3] === '1' ? 'red' : 'green' , fontWeight:"bold" }}>
            {binaryArray[3] === '1' ? 'High' : 'OK'}
          </td>
        </tr>
        <tr>
          <td>Phase Sequence</td>
          <td style={{ color: binaryArray[4] === '1' ? 'red' : 'green'  , fontWeight:"bold"}}>
            {binaryArray[4] === '1' ? 'Wrong' : 'OK'}
          </td>
        </tr>
        <tr>
          <td>Host Current</td>
          <td style={{ color: binaryArray[5] === '1' ? 'red' : 'green' , fontWeight:"bold" }}>
            {binaryArray[5] === '1' ? 'Fault' : 'OK'}
          </td>
        </tr>
        <tr>
          <td>Air Filter</td>
          <td style={{ color: binaryArray[6] === '1' ? 'red' : 'green' , fontWeight:"bold" }}>
            {binaryArray[6] === '1' ? 'Blocked' : 'OK'}
          </td>
        </tr>
        <tr>
          <td>Oil Separator</td>
          <td style={{ color: binaryArray[7] === '1' ? 'red' : 'green' , fontWeight:"bold" }}>
            {binaryArray[7] === '1' ? 'Blocked' : 'OK'}
          </td>
        </tr>
        <tr>
          <td>Oil Filter</td>
          <td style={{ color: binaryArray[8] === '1' ? 'red' : 'green'  , fontWeight:"bold"}}>
            {binaryArray[8] === '1' ? 'Blocked' : 'OK'}
          </td>
        </tr>
        <tr>
          <td>Fan Current</td>
          <td style={{ color: binaryArray[9] === '1' ? 'red' : 'green' , fontWeight:"bold" }}>
            {binaryArray[9] === '1' ? 'Fault' : 'OK'}
          </td>
        </tr>
        <tr>
          <td>Air Feed Pressure</td>
          <td style={{ color: binaryArray[14] === '1' ? 'red' : 'green'  , fontWeight:"bold"}}>
            {binaryArray[14] === '1' ? 'High' : 'OK'}
          </td>
        </tr>
        <tr>
          <td>Empty Long</td>
          <td style={{ color: binaryArray[15] === '1' ? 'red' : 'green' , fontWeight:"bold" }}>
            {binaryArray[15] === '1' ? 'Stop' : 'OK'}
          </td>
        </tr>
      </tbody>
    </Table >

        </Col>
        <Col sm="6" lg="6" xl="5" xxl="6">
        <Table  bordered style={{ border: '1px solid black' }}>
  <thead>
    <tr>
      <th>Run State 2</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alarm</td>
      <td style={{ color: binaryArray2[0] === "1" ? "red" : "green" , fontWeight:"bold" }}>
        {binaryArray2[0] === "1" ? "Alarm" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Pre-alarm</td>
      <td style={{ color: binaryArray2[1] === "1" ? "red" : "green" , fontWeight:"bold" }}>
        {binaryArray2[1] === "1" ? "Pre-alarm" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Lube Grease Time</td>
      <td style={{ color: binaryArray2[3] === "1" ? "red" : "green"  , fontWeight:"bold"}}>
        {binaryArray2[3] === "1" ? "Up" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Lube Oil Time</td>
      <td style={{ color: binaryArray2[4] === "1" ? "red" : "green" , fontWeight:"bold" }}>
        {binaryArray2[4] === "1" ? "Up" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Air Filter Time</td>
      <td style={{ color: binaryArray2[5] === "1" ? "red" : "green" , fontWeight:"bold" }}>
        {binaryArray2[5] === "1" ? "Up" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Oil Separator Time </td> 
      <td style={{ color: binaryArray2[6] === "1" ? "red" : "green"  , fontWeight:"bold"}}>
        {binaryArray2[6] === "1" ? "Up" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Oil Filter Time</td>
      <td style={{ color: binaryArray2[7] === "1" ? "red" : "green" , fontWeight:"bold"}}>
        {binaryArray2[7] === "1" ? "Up" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Air Exhaust Temperature </td>
      <td style={{ color: binaryArray2[8] === "1" ? "red" : "green"  , fontWeight:"bold"}}>
        {binaryArray2[8] === "1" ? "High Pre-Alarm" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Water</td>
      <td style={{ color: binaryArray2[13] === "1" ? "red" : "green" , fontWeight:"bold" }}>
        {binaryArray2[13] === "1" ? "Lacking" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Air Exhaust Temperature Sensor</td>
      <td style={{ color: binaryArray2[14] === "1" ? "red" : "green" , fontWeight:"bold" }}>
        {binaryArray2[14] === "1" ? "Failure" : "OK"}
      </td>
    </tr>
    <tr>
      <td>Air Feed Pressure Sensor</td>
      <td style={{ color: binaryArray2[15] === "1" ? "red" : "green" , fontWeight:"bold" }}>
        {binaryArray2[15] === "1" ? "Failure" : "OK"}
      </td>
    </tr>
  </tbody>
</Table>

        </Col>
      </Row>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
   
    
    </div>
  );
};

export default Starter;

