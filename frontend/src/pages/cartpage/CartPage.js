import Navbar from "../../components/Navbar/Navbar";
import useCart from "../../hooks/useCart";
import CartItem from "../../components/CartItem/CartItem";
import "./cartpage.scss";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { cartItems } = useCart();

  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let itemss = items;
    let price = 0;
    itemss.forEach((element) => {
      price = price + element.count * parseInt(element.price);
    });
    setTotalPrice(price);
  }, [items]);

  useEffect(() => {
    setItems(cartItems);
  }, []);

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
                />
              ))}
            </Col>
            <Col md={6}>
              <Form className="order-form">
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
                <Button style={{ background: "#7064e5", marginTop: "1em" }}>
                  Place Order
                </Button>
              </Form>
            </Col>
          </Row>
        ) : (
          <div className="no-products">
            <p>No Products found in Cart !</p>
            <Button style={{ background: "#7064e5", marginTop: "1em" }}>
              <a href="/" style={{ textDecoration: "none", color: "#fff" }}>
                Shop now!
              </a>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
