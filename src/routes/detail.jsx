import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'

export default function Detail(props) {

    let [count, setCount] = useState(3); // 카운팅 
    let [timer, setTimer] = useState(true); 
    let [val, setVal] = useState(""); // input 텍스트 

    useEffect(() => {
       let timer = setTimeout(()=> { setTimer(false);}, 2000);

       console.log(2);
       return () => { // useEffect 동작 전에 실행 
        console.log(1);
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
        </div> 
    )
}

