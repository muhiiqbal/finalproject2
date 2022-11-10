import ButtonComponent from "../components/ButtonComponent";
import { addCart, updateCartItem, updateQuantity, resetQuantity, updateItem, emptyCart } from "../redux/cartSlice";
import { addRecap, updateRecap } from "../redux/rekapSlice";
import React, { useEffect } from "react";
import { decreaseQuantity } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

const CartPage = (props) => {
  const dispatch = useDispatch();
  const { cart, quantity } = useSelector((state) => state.cart);
  const { data } = useSelector((state) => state.products);
  const { rekap } = useSelector((state) => state.rekap);
  console.log("cart", cart);
  // console.log('data',data);

  useEffect(() => {
    console.log(rekap);
    // console.log(cart);
  }, [rekap]);

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const sum = cart.reduce((accumulator, object) => {
    return accumulator + object.price * object.quantity;
  }, 0);

  const OnUpdateHandler = (e, product) => {
    if (e.target.value.length !== 0) {
      const updateProduct = { ...product, quantity: parseInt(e.target.value) };
      dispatch(updateItem(updateProduct));
    } else {
      const updateProduct = { ...product, quantity: 0 };
      dispatch(updateItem(updateProduct));
    }
  };

  const checkItem = (query) => {
    const found = rekap.some((el) => el.id === query.id);
    return found;
  };

  const addToRekap = (item) => {
    dispatch(addRecap(item));
    dispatch(decreaseQuantity(item));
  };

  const updateToRekap = (item) => {
    dispatch(updateRecap(item));
    dispatch(decreaseQuantity(item));
  };

  const OnCheckoutHandler = async () => {
    await cart.map((cartItem) => {
      if (cartItem.quantity <= data.find((product) => product.id === cartItem.id).quantity) {
        !checkItem(cartItem) ? addToRekap(cartItem) : updateToRekap(cartItem);
      }
    });
    dispatch(emptyCart());
  };
  return (
    <div>
      <div className="productList">
        <div class="headline container">
          <h1 className="mt-3 text-start">Cart</h1>
        </div>
        {cart.length === 0 ? (
          <h4>Anda Belum Menambahkan Product</h4>
        ) : (
          <div className="wrapped container">
            <div class="label-header d-flex justify-content-end justify-content-between w-50 ms-auto">
              <div class="header1 ms-5">
                <h6>Price</h6>
              </div>
              <div class="header1">
                <h6>Quantity</h6>
              </div>
              <div class="header1">
                <h6>Total</h6>
              </div>
            </div>
            {cart.map((item) => {
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
                        <input type="number" style={{ width: 64, height: 65 }} class="form-control me-5 ms-5" id="exampleInputEmail1" value={item.quantity} OnChange={(e) => OnUpdateHandler(e, item)} />
                      </td>
                      <td>{item.price * item.quantity}</td>
                    </tr>
                  </tbody>
                </table>
                // <div class="row mt-5">
                //   <div class="col-sm-6 d-flex justify-content-center">
                //     <img src={item.image} style={{ width: 64 }} alt="" />
                //     <div className="ms-2 align-self-center">
                //       <h6 className="text-secondary">{item.title}</h6>
                //       {/* <h1 style={{ width: 270 }}>{props.productName}</h1> */}
                //       {/* <>{displayError(props.error)}</> */}
                //     </div>
                //   </div>
                //   <div class="col-sm-6 d-flex">
                //     <h6 className="text-secondary">{item.price}</h6>
                //     {/* <h1>{props.unitPrice}</h1> */}
                //     <input type="number" style={{ width: 64, height: 65 }} class="form-control me-5 ms-5" id="exampleInputEmail1" value={item.quantity} OnChange={(e) => OnUpdateHandler(e, item)} />
                //     <h6 className="text-secondary">{item.price * item.quantity}</h6>
                //     {/* <h1>{props.totalPrice}</h1> */}
                //   </div>
                // </div>
              );
            })}
            
          </div>
        )}
      </div>
      <div class="container">
        <table className="table table-borderless">
          <tbody>
            <tr>
              <th scope="row">Total</th>
              <td colspan="2">
                <h3>{formatter.format(sum)}</h3>
              </td>
              <td>
                <ButtonComponent label="Checkout" className="btn btn-success" OnPress={() => OnCheckoutHandler()} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartPage;
