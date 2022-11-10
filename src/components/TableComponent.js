import React from "react";

const TableComponent = (props) => {
  const displayError = (error) => {
    if (error === "true") {
      return <h1 className="text-danger">Quantity Tidak Terpenuhi</h1>;
    }
  };
  return (
    <div class="container">
      <div className="left">
        <img src={props.imageUrl} style={{ width: 64 }} alt="iamage2" />

        <div>
          <h1 style={{ width: 270 }}>{props.productName}</h1>
          <>{displayError(props.error)}</>
          {/* <h1 width={270} label={props.productName} />
          <>{displayError(props.error)}</> */}
        </div>
      </div>
      <div className="right">
        <h1>{props.unitPrice}</h1>
        <input type="number" style={{ width: 64 }} class="form-control" id="exampleInputEmail1" value={props.quantity} OnChange={props.OnChange} />

        <h1>{props.totalPrice}</h1>
      </div>
    </div>
  );
};

export default TableComponent;
