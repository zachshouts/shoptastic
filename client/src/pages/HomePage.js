import { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const HomePage = ({ user, setCartItems }) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productsShowing, setProductsShowing] = useState(false);

  const fetchProducts = async (e) => {
    const productsResponse = await fetch(`/api/category/${e.target.key}`);
    const products = await productsResponse.json();
    setSelectedProducts(products);
  };

  const handleItemLoad = (e) => {
    const id = e.target.key;
    window.location.href = `/product?product_id=${id}`;
  };

  const testCheckout = () => {
    const params = new URLSearchParams(document.location.search);
    if (params.get("checkout") !== undefined && params.get("checkout")) {
      setCartItems([]);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      let productArr = [];
      // Fetch categories
      const categoryResponse = await fetch("/api/category");
      const category = await categoryResponse.json();

      category.map((category) => {
        productArr = [...productArr, ...category.products];
      });
      console.log(category);

      setSelectedProducts(productArr);

      // Update state with fetched data
      setCategories(category);
    }
    fetchCategories();
    testCheckout();
  }, []);

  const handleSelect = (selectedIndex) => {
    setSelectedCategoryIndex(selectedIndex);
    setProductsShowing(true);
  };
  return (
    <>
      <Row className="mx-auto">
        <Col className="col-2">
          <Carousel
            activeIndex={selectedCategoryIndex}
            onSelect={handleSelect}
            interval={2000}
            controls="true"
            indicators="true"
          >
            {categories.map((category) => (
              <Carousel.Item
                onClick={fetchProducts}
                key={category._id}
                className="category-item"
              >
                <img
                  className="category-images"
                  src={`/img/${category.name}_stock.png`}
                  alt="category image"
                />
                <Carousel.Caption>
                  <h3>{category.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <h2 className="product-heading">Products</h2>
      <Row className="product-listings text-align-center">
        {/* { productsShowing === true && (  */}

        {selectedProducts.map((product) => (
          <Col className="col-lg-4 col-md-5" key={product._id}>
            <Card
              className="product-card align-items-flex-end"
              onClick={handleItemLoad}
              key={product._id}
            >
              <Card.Body>
                <Card.Title className="producttitle">
                  {product.title}
                </Card.Title>
                <img
                  src={`/img/products/${product.name}`}
                  className="product-image"
                />
                <Card.Text className="product-price">{product.price}</Card.Text>
                <Card.Text>
                  <a href={`/product?product_id=${product._id}`}>View More</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {/*}  )}    */}
      </Row>
    </>
  );
};

export default HomePage;
