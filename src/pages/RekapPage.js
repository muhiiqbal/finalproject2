import React from "react";
import { useSelector, useDispatch } from "react-redux";

const RekapPage = () => {
  const { rekap } = useSelector((state) => state.rekap);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const sum = rekap.reduce((accumulator, object) => {
    return accumulator + object.price * object.quantity;
  }, 0);

  return (
    <div className="container">
      <div class="container">
        <h3>Rekap Penjualan</h3>
      </div>
      {rekap.length === 0 ? (
        <h2>Belum Ada Penjualan</h2>
      ) : (
        <div className="wrapped container">
           <div class="label-header d-flex justify-content-end justify-content-between w-50 ms-auto">
              <div class="header1 ms-5">
                <h6>Price</h6>
              </div>
              <div class="header1">
                <h6>Terjual</h6>
              </div>
              <div class="header1">
                <h6>Total</h6>
              </div>
            </div>
          {rekap.map((item) => {
            return (
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">
                        <img src={item.image} style={{ width: 64 }} alt="" />
                      </th>
                      <td>{item.title}</td>
                      <td>${item.price}</td>
                      <td>
                        <input type="number" style={{ width: 64, height: 65 }} class="form-control me-5 ms-5" id="exampleInputEmail1" value={item.quantity} />
                      </td>
                      <td>{item.price * item.quantity}</td>
                    </tr>
                  </tbody>
                </table>
                // <TableData productName={item.title} unitPrice={item.price} totalPrice={item.price * item.quantity} quantity={item.quantity} imageUrl={item.image} disabled="true" />;
            )
          })}
          <div class="container">
        <table className="table table-borderless">
          <tbody>
            <tr>
              <th scope="row">Total</th>
              <td colspan="2">
                
              </td>
              <td>
              <h3>{formatter.format(sum)}</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
          {/* <div className="bottomCart">
            <TotalPrice headerLabel="Total" totalPrice={formatter.format(sum)} />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default RekapPage;
