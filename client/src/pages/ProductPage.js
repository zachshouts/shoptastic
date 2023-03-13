import React from "react";
import { useState, useEffect } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

const ProductPage = ({ user, cartItems, setCartItems }) => {
  // Set state for search result and search query
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({ quantity: 0 });
  const [addedToCart, setAddedToCart] = useState(false);

  const fetchProduct = async (e) => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("product_id");
    // console.log(id);
    const productResponse = await fetch(`/api/product/${id}`);
    const singleProduct = await productResponse.json();
    console.log(singleProduct);
    setProduct(singleProduct);
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const productContainer = {
      title: product.title,
      price: product.price * formData.quantity,
      quantity: parseInt(formData.quantity),
      image: product.image,
      stripe_id: product.stripe_id,
    };
    console.log(productContainer);
    setCartItems([...cartItems, productContainer]);
    setAddedToCart(true);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Container>
      <Row className="py-3">
        <Col className="col-6">
          <div>
            <img
              src={`/img/${product.images}`}
              className="img-responsive"
              style={{ width: "100%" }}
            />
          </div>
        </Col>
        <Col className="col-6">
          <div className="single-product-details text-center">
            <h4 className="py-3">{product.title}</h4>
            <p>{product.description}</p>
            <p>Number in stock: {product.stock}</p>
            <p>Price: ${product.price}</p>
            <form className="form mb-3" onSubmit={handleFormSubmit}>
              <div className="form-group">
                {/* <input type="hidden" name="stripe_id" value={product.stripe_id} /> */}

                <label className="px-2">Enter Quantity:</label>

                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  style={{ width: "15px;", marginBottom: "25px" }}
                  onChange={handleInput}
                />

                <row className="row justify-content-center">
                  {addedToCart ? (
                    <Button className="btn-outline-success">
                      Added to Cart
                    </Button>
                  ) : (
                    <Button
                      className="btn-outline-danger"
                      onClick={handleFormSubmit}
                    >
                      Add to Cart
                    </Button>
                  )}
                </row>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
