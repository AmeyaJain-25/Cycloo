import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import useCart from "../../hooks/useCart";
import CartItem from "../../components/CartItem/CartItem";
import { auth } from "../../utils/firebaseConfig";
import emptyCartImg from "../../assets/empty-cart-removebg-preview.png";
import "./cartpage.scss";
import {
  Button,
  Col,
  Collapse,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/backend";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, emptyCart } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addressText, setAddressText] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const history = useHistory();

  useEffect(() => {
    let itemss = items;
    let price = 0;
    itemss.forEach((element) => {
      price = price + element.count * element.price;
    });
    setTotalPrice(price);
  }, [items]);

  useEffect(() => {
    // setItems(cartItems);
    if (user) {
      setUserPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  const placeOrder = (e) => {
    e.preventDefault();
    if (!isOpen) {
      return setIsOpen(true);
    }
    if (!isAuthenticated) {
      return history.push({
        pathname: "/login",
        state: "cart",
      });
    }
    // orderBy, status, address, amount, products, paymentMethod
    if (!userPhoneNumber) {
      return toast.error("Phone Number cannot be empty!");
    }

    if (!addressText) {
      return toast.error("Address cannot be empty!");
    }
    setLoading(true);
    let body = {
      orderBy: user.uid,
      status: "Placed",
      address: addressText,
      amount: totalPrice,
      products: cartItems,
      paymentMethod: "COD",
      contactNumber: userPhoneNumber,
    };
    auth.currentUser.getIdToken(true).then((idToken) => {
      console.log(idToken);
      axios
        .post(`${API_URL}/order/create/${user.uid}`, body, {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${idToken}`,
          },
        })
        .then((res) => {
          console.log("RES: ", res);
          emptyCart();
          history.push("/orders");
        })
        .catch((err) => {
          console.log("ERR: ", err.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <>
      <Navbar />
      <div className="cartpage">
        {cartItems.length ? (
          <Row>
            <Col md={6}>
              {cartItems.map((cartObj) => (
                <CartItem
                  cartObj={cartObj}
                  setItems={setItems}
                  key={cartObj.productId}
                  isOpen={isOpen}
                />
              ))}
            </Col>
            <Col md={6} style={{ marginTop: "20px" }}>
              <div className="order-form">
                <Collapse isOpen={isOpen}>
                  <FormGroup>
                    <Label>Name of Customer</Label>
                    <Input type="text" placeholder="Contact Person's Name" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Contact Number</Label>
                    <Input type="text" placeholder="Contact Number" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Address</Label>
                    <Input
                      value={addressText}
                      onChange={(e) => setAddressText(e.target.value)}
                      type="textarea"
                      placeholder="Landmark, City, Pincode"
                    />
                  </FormGroup>
                  <Table style={{ margin: "2em 0px" }}>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((cart, i) => (
                        <tr key={i}>
                          <td>{cart.name}</td>
                          <td>{cart.price}</td>
                          <td>{cart.count}</td>
                          <td>{cart.count * parseInt(cart.price)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <th>Grand Total</th>
                        <th>&#8377; {totalPrice} /-</th>
                      </tr>
                    </tbody>
                  </Table>
                  <div>Mode of Payment: Cash on Delivery (COD) </div>
                </Collapse>
                <Button
                  onClick={placeOrder}
                  style={{ background: "#7064e5", marginTop: "1em" }}
                >
                  {loading ? <Spinner color="light" /> : "Place Order"}
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="no-products">
            <img src={emptyCartImg} alt="" />
            <Button style={{ background: "#7064e5", marginTop: "1em" }}>
              <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                Shop now!
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
