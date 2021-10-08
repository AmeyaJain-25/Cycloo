import { Col, Row } from "reactstrap";
import Sidebar from "./Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}></Col>
      </Row>
    </div>
  );
};

export default HomePage;
