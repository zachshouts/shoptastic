import { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const category = [
  {
    name: "Footwear",
    Products: [
      {
        title: "sneakers",
        description: "Comfortable sneakers",
        price: "55",
        imags: "https://via.placeholder.com/640x360",
        creator: "John Boy",
      },
      {
        title: "shoes",
        description: "Comfortable shoes",
        price: "55",
        images: "https://via.placeholder.com/640x360",
        creator: "John Boy",
      },
    ],
  },
  {
    name: "Toys",
    Products: [
      {
        title: "Blocks",
        description: "Build stuff",
        price: "25",
        images: "https://via.placeholder.com/640x360",
        creator: "Jackson",
      },
      {
        title: "Doll",
        description: "Scary little doll",
        price: "15",
        images: "https://via.placeholder.com/640x360",
        creator: "Mia",
      },
    ],
  },
];

const HomePage = ({ user }) => {
  const [data, setData] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const categoryResponse = await fetch("/api/categories");
        const categories = await categoryResponse.json();

        // Fetch products for each category
        const productPromises = categories.map((category) =>
          fetch(`/api/products/${category.name}`)
        );
        const productResponses = await Promise.all(productPromises);
        const products = await Promise.all(
          productResponses.map((response) => response.json())
        );

        // Combine categories and products into one array
        const combinedData = categories.map((category, index) => ({
          ...category,
          products: products[index],
        }));

        // Update state with fetched data
        setData(combinedData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleSelect = (selectedIndex) => {
    setSelectedCategoryIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={selectedCategoryIndex} onSelect={handleSelect}>
        {data.map((category) => (
          <Carousel.Item key={category.name}>
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
        {data[selectedCategoryIndex]?.products?.map((product) => (
          <Col className="col-lg-4 col-md-5" key={product.title}>
            <Card className="product-card align-items-flex-end">
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
