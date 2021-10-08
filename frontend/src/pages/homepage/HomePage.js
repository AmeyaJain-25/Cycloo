import { Col, Row } from "reactstrap";
import Sidebar from "./Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/Card/ProductCard";
import { getAllProducts } from "./helper/apiCalls";
import { useEffect, useState } from "react";
import "./homepage.scss";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredPro, setFilteredPro] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = () => {
    setLoading(true);
    getAllProducts()
      .then((res) => {
        console.log("RES:", res);
        setProducts(res);
        setFilteredPro(res);
      })
      .catch((err) => {
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
      <Row>
        <Col md={3}>
          <Sidebar products={products} setFilteredPro={setFilteredPro} />
        </Col>
        <Col md={9}>
          <div className="products-container">
            {!loading ? (
              filteredPro.length ? (
                filteredPro.map((productObj) => (
                  <ProductCard
                    key={productObj.productId}
                    productObj={productObj}
                  />
                ))
              ) : (
                <p>No Products Found!</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
