import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getMyAllOrders } from "../../pages/homepage/helper/apiCalls";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";
import OrderItem from "../OrderItem/OrderItem";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyAllOrders = () => {
    setLoading(true);
    getMyAllOrders(user.uid, user.accessToken)
      .then((res) => {
        console.log("RES:", res);
        setOrders(res);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyAllOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: "1220px",
          margin: "0em auto",
          padding: "20px",
          width: "100%",
        }}
      >
        {!loading ? (
          orders.length > 0 ? (
            orders.map((order, index) => {
              return <OrderItem order={order} key={index} />;
            })
          ) : (
            <p className="no-products">No Orders Found!</p>
          )
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Orders;
