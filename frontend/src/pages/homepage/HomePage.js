import { Row, Col } from "reactstrap";
import Sidebar from "./Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "./helper/apiCalls";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import img from "../../assets/Pink and Green Circles Biking Facebook Post.png";
import img2 from "../../assets/Cycle Fundraising Poster.png";
import AwesomeSlider from "react-awesome-slider";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss";
import "./homepage.scss";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredPro, setFilteredPro] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = () => {
    setLoading(true);
    getAllProducts()
      .then(res => {
        console.log("RES:", res);
        setProducts(res);
        setFilteredPro(res);
      })
      .catch(err => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <Row className="homepageRow">
        <Col sm={3}>
          <Sidebar products={products} setFilteredPro={setFilteredPro} />
        </Col>
        <Col sm={9} style={{ padding: "0" }} className="products-container">
          <Row style={{ margin: "2em 0" }}>
            <AwesomeSlider
              interval={5000}
              style={{ height: "350px" }}
              animation="foldOutAnimation"
              cssModule={[CoreStyles, AnimationStyles]}
            >
              <div data-src={img} />
              <div data-src={img2} />
              <div data-src={img} />
            </AwesomeSlider>
          </Row>
          <Row>
            {!loading ? (
              filteredPro.length ? (
                filteredPro.map(product => (
                  <Col lg={4}>
                    <ProductCard key={product.productId} product={product} />
                  </Col>
                ))
              ) : (
                <p>No Products Found!</p>
              )
            ) : (
              <Loader />
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
