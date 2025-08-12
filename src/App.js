import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './datas/data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from "./routes/detail.jsx";
import axios from "axios";

const FALLBACK_IMG = process.env.PUBLIC_URL + "/img/product1.webp"; // 기본 이미지
function App() {

  let [products, setProducts] = useState(data);
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
                <Row xs={1} md={3}>
                  {products.map((item, i) => (
                    <ProductCard key={i} item={item} />
                  ))}
                </Row>
                <button onClick={()=> {
                  // 로딩중 UI 띄우기 
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((data)=> {
                    setProducts(prev => [...prev, ...data.data]);
                    // 로딩중 UI 숨기기
                  })
                  .catch(()=> {
                    console.log('실패!')
                    // 로딩중 UI 숨기기
                  })

                  // 동시에 ajax 요청 후 동일 처리 하려면 
                  Promise.all([axios.get('/url1'), axios.get('/url2')])
                  .then(()=> {

                  })
                }}>더보기</button>
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
  const imgSrc = process.env.PUBLIC_URL + item.img;

   const handleImgError = (e) => {
    e.currentTarget.onerror = null;         // 무한 루프 방지
    e.currentTarget.src = FALLBACK_IMG;     // 대체 이미지
  };

  return (
    <Col>
      <img 
        className='productImg' 
        src={imgSrc} width='90%'
        onError={handleImgError}
        onClick={() => navigate(`/detail/${item.id}`)}
      />
      <h4 className='productName'>{item.title}</h4>
      <p>{item.price}</p>
    </Col>
  )
}
export default App;
