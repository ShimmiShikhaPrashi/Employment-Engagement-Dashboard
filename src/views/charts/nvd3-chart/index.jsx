import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Select from 'react-select';

import LineChart from './chart/LineChart';
import BarDiscreteChart from './chart/BarDiscreteChart';
import PieDonutChart from './chart/PieDonutChart';
import PieBasicChart from './chart/PieBasicChart';
import GroupedColumnChart from './chart/GroupedChart';
import RadarChart from './chart/RadarChart';
import HeatMap from './chart/Heatmap';

const unitOptions = [
  { value: 'banglore', label: 'Hospital Unit 1' },
  { value: 'delhi', label: 'Hospital Unit 2' },
  { value: 'haryana', label: 'Hospital Unit 3' },
  { value: 'hebbal', label: 'Hospital Unit 4' }
];

const competencyOptions = [
  { value: 'main', label: 'Main Competency' },
];

const chartOptions = [
  { value: 'grouped', label: 'Grouped Multi-Bar Chart' },
  { value: 'heatMap', label: 'Heat Map' },
  { value: 'radarChart', label: 'Radar Chart' }
];

const Nvd3Chart = () => {
  const [selectedChart, setSelectedChart] = useState(chartOptions[0]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedCompetency, setSelectedCompetency] = useState(null);

  const handleChartChange = (selectedOption) => {
    setSelectedChart(selectedOption);
  };

  const handleUnitChange = (selectedOptions) => {
    setSelectedUnits(selectedOptions || []);
  };

  const handleCompetencyChange = (selectedOption) => {
    setSelectedCompetency(selectedOption);
  };

  // Function to render the selected chart
  const renderChart = () => {
    switch (selectedChart?.value) {
      case 'grouped':
        return <GroupedColumnChart />;
      case 'heatMap':
        return <HeatMap />;
      case 'radarChart':
        return <RadarChart />;
      default:
        return <LineChart />;
    }
  };

  return (
    <>
      <Row>  
        <Col md={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Select Unit</Card.Title>
            </Card.Header>
            <Card.Body>
              <Select 
                options={unitOptions} 
                isMulti 
                value={selectedUnits} 
                onChange={handleUnitChange} 
                placeholder="Select units..."
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Select Competency</Card.Title>
            </Card.Header>
            <Card.Body>
              <Select 
                options={competencyOptions} 
                value={selectedCompetency} 
                onChange={handleCompetencyChange} 
                placeholder="Select competency..."
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Select Graph</Card.Title>
            </Card.Header>
            <Card.Body>
              <Select 
                options={chartOptions} 
                value={selectedChart} 
                onChange={handleChartChange} 
                placeholder="Select graph type..."
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Chart Preview</Card.Title>
            </Card.Header>
            <Card.Body>
              {renderChart()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Nvd3Chart;
