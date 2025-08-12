import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { Nav } from 'react-bootstrap'


export default function Detail(props) {

    let [count, setCount] = useState(3); // 카운팅 
    let [timer, setTimer] = useState(true); 
    let [val, setVal] = useState(""); // input 텍스트 
    let [tab, setTab] = useState(0);

    useEffect(() => {
       let timer = setTimeout(()=> { setTimer(false);}, 2000);
       return () => { // useEffect 동작 전에 실행 
        clearTimeout(timer)
       }
    }); 

    const handleChangeVal = (e) => {
        const next = e.target.value;
        console.log(next)
        if (next === "" || /^\d+$/.test(next)) {
            setVal(next);                     // 숫자만 반영
        } else {
            alert("숫자만 입력하시라니까요.");
            setVal(next.replace(/\D/g, ""));  // 숫자 외 제거(선택)
        }
    };

    let { id } = useParams();
    const idx = Number(id);

    const isValid =
        Number.isInteger(idx) && idx >= 0 && idx < (props.products?.length ?? 0);
    if (!isValid) {
        return (
            <div>
                <p>404</p>
            </div>
        )
    }
   
    return (
        <div className="products-container">
            {
                alert == true
                ? <div className="alert alert-warning" id="alert">
                    2초 이내 구매 시 할인 !!
                  </div>
                : null
            }
            

            {/** 상세 내용 */}
            <div className="row">
                <div className="col-md-6">
                    <img src={props.products[id].img} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.products[id].title}</h4>
                    <p>{props.products[id].content}</p>
                    <p>{props.products[id].price}</p>
                    <button className="btn btn-danger">주문하기</button>
                    <div className="productInput">
                        <input 
                           id="text" 
                           name="text" 
                           type="text" 
                           placeholder="숫자만 입력하삼요."
                           value={val} 
                           onChange={handleChangeVal}
                           required 
                        />
                    </div>
                </div>
            </div>
            {/** tab 3개 */}
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=> setTab(0)} eventKey="link0" >버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=> setTab(1)} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=> setTab(2)} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>
        </div> 
    )
}

function TabContent({tab}) {
    return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]
}




