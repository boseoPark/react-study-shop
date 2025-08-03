import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './js/data.js';

function App() {

  let [products] = useState(data);
  return (
    <div className="App">
      <div className='header'>
        <Navbar bg="" data-bs-theme="dark" className='navbar'>
            <Container>
              <Navbar.Brand href="#home">boseolog 💖</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
      </div>
      <div className='main-bg' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/main_thumbnail.jpg)`}}></div>
      <div className='products'>
        <Container>
          <Row>
            {products.map((item, i) => (
              <ProductCard key={i} item={item} />
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}


function ProductCard({ item }) {
  return (
    <Col>
      <img className='productImg' src={process.env.PUBLIC_URL + item.img} width='90%' ></img>
      <h4 className='productName'>{item.title}</h4>
      <p>{item.price}</p>
    </Col>
  )
}
export default App;
