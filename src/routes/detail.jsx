import { useParams } from "react-router-dom";

export default function Detail(props) {

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
            <div className="row">
                <div className="col-md-6">
                    <img src={props.products[id].img} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.products[id].title}</h4>
                    <p>{props.products[id].content}</p>
                    <p>{props.products[id].price}</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    )
}

