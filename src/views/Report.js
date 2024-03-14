import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input } from 'reactstrap';

const Report = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://raymondbackend.onrender.com/api/getdataall'); // Replace with your actual API endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterClick = async () => {
    try {
      const response = await axios.get(`https://raymondbackend.onrender.com/api/getdataall?startDate=${startDate}&endDate=${endDate}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  return (
    <div>
      <h1>Report</h1>
      <div className='row' style={{marginBottom : "2rem"}}>
        <div className='col-4'>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        </div>
        <div className='col-4'>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        </div>
        <div className='col-4'>
        <Button color="primary" onClick={handleFilterClick}>
          Filter
        </Button>
        </div>
        
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>DateTime</th>
            <th>AirFeedPre</th>
            <th>AirExstTemp</th>
            <th>RunTime</th>
            <th>LoadTime</th>
            <th>HostAPhCur</th>
            <th>Spare1</th>
            <th>Spare2</th>
            <th>OilfilterT</th>
            <th>OilSepTime</th>
            <th>AirFiltTime</th>
            <th>LubeOilTime</th>
            <th>LubeGreaseT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.DateTime).toLocaleString()}</td>
              <td>{item.AirFeedPre}</td>
              <td>{item.AirExstTemp}</td>
              <td>{item.RunTime}</td>
              <td>{item.LoadTime}</td>
              <td>{item.HostAPhCur}</td>
              <td>{item.Spare1}</td>
              <td>{item.Spare2}</td>
              <td>{item.OilfilterT}</td>
              <td>{item.OilSepTime}</td>
              <td>{item.AirFiltTIme}</td>
              <td>{item.LubeOilTime}</td>
              <td>{item.LubeGreaseT}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Report;
