import React, { useState } from "react";
import { Row, Col, Card, Table, ProgressBar, Badge, Pagination, Form } from "react-bootstrap";

const data = [
  { id: "1", name: "Jithin V G .", department: "11CD", unit: "Old Airport Road", percentile: 99.13, quantity: 220, balance: "$1200" },
  { id: "2", name: "Meera James .", department: "WARD", unit: "Panaji", percentile: 96.51, quantity: 390, balance: "$750" },
  { id: "3", name: "Elasamma V C .", department: "PICU", unit: "Old Airport Road", percentile: 86.46, quantity: 170, balance: "$1490" },
  { id: "4", name: "Srilatha . .", department: "ADMIN", unit: "Miller Road", percentile: 88.21, quantity: 270, balance: "$810" },
  { id: "5", name: "John Doe", department: "PICU", unit: "Miller Road", percentile: 92.33, quantity: 310, balance: "$950" },
  { id: "6", name: "Jane Smith", department: "WARD", unit: "Panaji", percentile: 89.76, quantity: 150, balance: "$680" },
];

const getStatusBadge = (department) => {
  switch (department) {
    case "11CD":
      return <Badge bg="success">11CD</Badge>;
    case "WARD":
      return <Badge bg="success">WARD</Badge>;
    case "PICU":
      return <Badge bg="success">PICU</Badge>;
    case "ADMIN":
      return <Badge bg="success">ADMIN</Badge>;
    default:
      return <Badge bg="secondary">Unknown</Badge>;
  }
};

const BootstrapTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <Card.Title as="h5">Compentency Report</Card.Title>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: "200px" }}
              />
              <div className="d-flex align-items-center">
                <span className="me-2 text-black">Show:</span>
                <Form.Select value={itemsPerPage} onChange={handleItemsPerPageChange} style={{ width: "60%" }}>
                  <option value="3">3</option>
                  <option value="5">5</option> 
                  <option value="10">10</option>
                </Form.Select>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr> 
                  <th rowSpan="2">ID</th>
                  <th rowSpan="2">Name</th>
                  <th rowSpan="2">Unit</th>
                  <th rowSpan="2">Department</th>
                  <th rowSpan="2">Leadership / 36<br />(Score)</th>
                  <th colSpan="2">Leadership</th>
                  <th rowSpan="2">Relationship Building / 36<br />(Score)</th>
                  <th colSpan="2">Relationship Building</th>
                </tr>
                <tr>
                  <th>(MH Percentile)</th>
                  <th>(Unit Percentile)</th>
                  <th>(MH Percentile)</th>
                  <th>(Unit Percentile)</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.unit}</td>
                    <td>{getStatusBadge(item.department)}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <ProgressBar now={item.percentile} label={`${item.percentile}%`} variant="purple" />
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <ProgressBar now={item.percentile} label={`${item.percentile}%`} variant="purple" />
                    </td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>

            </Table>
            <Pagination className="justify-content-end">
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default BootstrapTable;