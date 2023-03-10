import { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const HomePage = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchProducts = async (e) => {
    const productsResponse = await fetch(`/api/category/${e.target.key}`);
    const products = await productsResponse.json();
    setSelectedProducts(products);
  };

  const handleItemLoad = (e) => {
    const id = e.target.key;
    window.location.href = `/product?product_id=${id}`;
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        let productArr = [];
        // Fetch categories
        const categoryResponse = await fetch("/api/category");
        const category = await categoryResponse.json();

        category.map((category) => {
          productArr = [...productArr, ...category.products];
        });

        setSelectedProducts(productArr);

        // Update state with fetched data
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  const handleSelect = (selectedIndex) => {
    setSelectedCategoryIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={selectedCategoryIndex} onSelect={handleSelect}>
        {categories.map((category) => (
          <Carousel.Item onClick={fetchProducts} key={category._id}>
            <img
              className="d-block w-100"
              src={category.image}
              alt={category.name}
            />
            <Carousel.Caption>
              <h3>{category.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <h2>Products</h2>
      <Row>
        {selectedProducts.map((product) => (
          <Col className="col-lg-4 col-md-5" key={product._id}>
            <Card
              className="product-card align-items-flex-end"
              onClick={handleItemLoad}
            >
              <Card.Body>
                <Card.title className="producttitle">
                  {product.title}
                </Card.title>
                <img src={product.image} className="product-image" />
                <Card.Text className="product-price">{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
