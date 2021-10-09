import { Col, Row } from "reactstrap";
import Sidebar from "./Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "./helper/apiCalls";
import { useEffect, useState } from "react";
import "./homepage.scss";
import Loader from "../../components/Loader/Loader";

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
      <Row>
        <Col md={3}>
          <Sidebar products={products} setFilteredPro={setFilteredPro} />
        </Col>
        <Col md={9} style={{ padding: "0" }}>
          <div className="products-container">
            {!loading ? (
              filteredPro.length ? (
                filteredPro.map(product => (
                  <ProductCard key={product.productId} product={product} />
                ))
              ) : (
                <p>No Products Found!</p>
              )
            ) : (
              <Loader />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
