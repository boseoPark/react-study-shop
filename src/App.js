import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './datas/data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from "./routes/detail.jsx";


function App() {

  let [products] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">

      <div className='header'>
        <Navbar bg="" data-bs-theme="dark" className='navbar'>
            <Container>
              <Navbar.Brand href="/">boseolog 💖</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => { navigate('/')}}>Home</Nav.Link>
                <Nav.Link onClick={() => { navigate('/detail')}}>Detail</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
              <Link to="/detail">상세</Link>
            </Container>
          </Navbar>
      </div>

      <Routes>
        <Route path="/" element={
          <>
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
          </>
        }/>
        <Route path="/detail/:id" element={<Detail products={products}/>}/>

        <Route path="/about" element={<About/>}>
          <Route path="member" element={<AboutMember/>}/>
          <Route path="location" element={<AboutLocation/>}/>
        </Route>
       
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>}/>
        </Route>
        <Route path="*" element={<div>404</div>}/>
      </Routes>
    </div>
  );
}
function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet /> 
    </div>
  )
}


// about 페이지 겸 컴포넌트 
function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet /> 
    </div>
  )
}

function AboutMember() {
  return (
    <div>
      <h4>회원정보</h4>
    </div>
  )
}

function AboutLocation() {
  return (
    <div>
      <h4>위치정보</h4>
    </div>
  )
}



function ProductCard({ item }) {
  const navigate = useNavigate();
  return (
    <Col>
      <img 
        className='productImg' 
        src={process.env.PUBLIC_URL + item.img} width='90%'
        onClick={() => navigate(`/detail/${item.id}`)}
      />
      <h4 className='productName'>{item.title}</h4>
      <p>{item.price}</p>
    </Col>
  )
}
export default App;
