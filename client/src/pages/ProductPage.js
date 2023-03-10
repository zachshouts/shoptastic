import React from "react";
import { useState, useEffect } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

const ProductPage = ({ user, cartItems, setCartItems }) => {
  // Set state for search result and search query
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState("");

  const id = URLSearchParams.get("product_id");

  const fetchProduct = async (e) => {
    const productResponse = await fetch(`/api/product/${id}`);
    const singleProduct = await productResponse.json();
    setProduct(singleProduct).catch((err) => console.log(err));
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const productContainer = {
      title: product.title,
      price: product.price,
      quantity: formData.quantity,
      image: product.image,
      stripe_id: product.stripe_id,
    };
    setCartItems([...cartItems, productContainer]);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Container>
      <Row>
        <Col className="col-6 mx-auto">
          <img src={product.image} />
        </Col>
        <Col className="col-6 mx-auto">
          <h4 className="py-3">{product.title}</h4>
          <p>{product.description}</p>
          <p>Number in stock: {product.stock}</p>
          <p>Price: ${product.price}</p>
          <form className="form mb-3" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input type="hidden" name="stripe_id" value={product.stripe_id} />
              <label>Enter Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInput}
              />
              <Button
                className="btn btn-outline-success"
                onClick={handleFormSubmit}
              >
                Purchase
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
