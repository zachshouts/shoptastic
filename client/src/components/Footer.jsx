import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  <footer className="bg-light text-center text-lg-start text-muted">
    <section>
      <Container className="text-center text-md-start mt-5">
        <Row className="mt-3">
          <Col md="3" className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              Bobby's Bikeshop
            </h6>
          </Col>
          <Col md="3" lg="3" xl="3" className="mx-auto mb-4">
            <a href="#" className="text-reset"><p>Privacy Policy</p></a>
          </Col>
          <Col md="3" lg="3" xl="3" className="mx-auto mb-4">
            <a href="#" className="text-reset"><p>Terms and Conditions</p></a>
          </Col>
          <Col md="3" lg="3" xl="3" className="mx-auto mb-4">
            <a href="#" className="text-reset"><p>About Us</p></a>
          </Col>
        </Row>
    </Container>  
      </section>
      <div className='text-center p-4' style={{ backgroundColor: 'gray'}}>
        @ 2023 Bobby's Bikeshop
      </div>
  </footer>

}

export default Footer;