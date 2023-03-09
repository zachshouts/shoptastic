import React from 'react';
import { useState, useEffect } from 'react';

import {Container, Row, Col} from 'react-bootstrap'

const ProductPage = ({user}) => {
  // Set state for search result and search query
  const [product, setProduct] = useState({});
  

const fetchProduct = async (e) => {
  const productResponse = await fetch(`/api/product/${e.target.key}`);
  const singleProduct = await productResponse.json();
  setProduct(singleProduct)
  .catch((err) => console.log(err));
}
 
  
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
        </Col>
      </Row>
    </Container>
  )
}

export default ProductPage;