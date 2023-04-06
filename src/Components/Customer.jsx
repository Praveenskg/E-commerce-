import React, { useState, useEffect } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function Customer() {
  const [mylist, setMylist] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8000/show").then((res) => setMylist(res.data));
  }, []);
  function onAddCart(e) {
    e.preventDefault();
    const id = e.target.id;
    const qty = 1;
    const data = { id: id, qty: qty };
    Axios.post("http://localhost:8000/addcart", data).then((res) =>
      alert("added  to cart")
    );
  }

  return (
    <div>
      <h2 className="text-center">All Availabe Products</h2>
      <Row xs={2} md={5} className="g-0">
        {mylist.map((item, index) => {
          return (
            <Col key={index}>
              <Card style={{ width: "20rem" }} className="my-5 mx-3 bg-light">
                <Card.Img variant="top" src={item.image} height="250px" />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Price- ₹{item.price}</Card.Text>
                  <Button
                    variant="primary"
                    id={item.product_id}
                    onClick={onAddCart}
                  >
                    Add To Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Customer;
