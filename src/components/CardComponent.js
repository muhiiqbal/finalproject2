import React from "react";
import ButtonComponent from "./ButtonComponent";

const CardComponent = (props) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const CardType = (type) => {
    if (type === "detail") {
      return (
        <>
          <input style={{ width: 64}} type="number" class="form-control" id="exampleInputPassword1" placeholder="1" OnChange={props.OnChangeField} />
          <ButtonComponent label="Add to cart" className="btn btn-primary" OnPress={props.OnCart} />
        </>
      );
    } else if (type === "admin") {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <h6 className="me-2">Update Stock</h6>
          <ButtonComponent className="btn btn-light ms-2 me-2" label="+1" OnPress={props.OnPlus} />
          <ButtonComponent  className="btn btn-light" label="-1" OnPress={props.OnMinus} />
        </div>
      );
    } else {
      return (
        <>
          <ButtonComponent label="View Details" className="btn btn-secondary me-2" OnPress={props.OnView} />
          <ButtonComponent label="Add to cart" className="btn btn-primary" OnPress={props.OnCart} />
        </>
      );
    }
  };
  return (
    <div class="card shadow p-3 mt-4 ms-4" style={{ width: 350 }}>
      <img style={{ height: 300 }} src={props.image} class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">{props.title}</h5>
        <h6 className="card-title text-info">{props.category}</h6>
        <p class="card-text">{props.description}</p>
        <h2>{formatter.format(props.price)}</h2>
        <h5 class="card-title text-black-50 mb-2">{`Stock: ${props.quantity}`}</h5>
        <div class="action">{CardType(props.type)}</div>
      </div>
    </div>
  );
};

export default CardComponent;
