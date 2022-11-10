import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart, updateCartItem, updateQuantity, resetQuantity } from "../redux/cartSlice";
import { fetchProducts, decreaseQuantity } from "../redux/productSlice";
import React, { useState } from "react";
import CardComponent from "../components/CardComponent";
import ButtonComponent from "../components/ButtonComponent";

const ProductDetailPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useSelector((state) => state.products);
  const { cart, quantity } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const thisProduct = data[id - 1];

  // const [cartQuantity, setCartQuantity] = useState();

  // const onChangeFieldHandler = (e) => {
  //   const itemQuantity = cartQuantity;
  //   dispatch(updateQuantity(parseInt(itemQuantity)));
  // };

  const checkItem = (query) => {
    const found = cart.some((el) => el.id === query.id);
    return found;
  };

  const addCartHandler = (item) => {
    const newItem = { ...item, quantity: quantity };
    console.log(newItem);
    if (isAuthenticated) {
      if (!checkItem(item)) {
        dispatch(addCart(item));
      } else {
        dispatch(updateCartItem(item));
      }
      // dispatch(decreaseQuantity(newItem));
      dispatch(resetQuantity());
    } else {
      navigate("/login");
    }
  };

  const quantityInputHandler = (e, product) => {
    const itemQuantity = parseInt(e.target.value);
    if (itemQuantity > product.quantity) {
      dispatch(updateQuantity(product.quantity));
    } else {
      dispatch(updateQuantity(itemQuantity));
    }
  };

  return (
    <div className="productList">
      <div class="btn-back mt-3 d-flex justify-content-start container">
        <Link to="/" className="btn btn-outline-info">
          Back
        </Link>
      </div>
      <div class="container">
        <div class="row mt-5">
          <div class="col-sm-6">
            <img src={thisProduct.image} alt="gambar" style={{ width: 400, height: 400 }} />
          </div>
          <div class="col-sm-6">
            <div class="container text-start">
              <h1>{thisProduct.title}</h1>
              <h6 className="text-start mt-3 text-info">{thisProduct.category}</h6>
              <p className="fw-normal mt-3">{thisProduct.description}</p>
              <h3 className="fw-bold">${thisProduct.price}</h3>
              <div class="btn-card d-flex align-items-center d-grid gap-2 mt-5">
                <input style={{ width: 60,height: 60 }} type="number" class="form-control align-self-center" id="exampleInputPassword1" placeholder="1" OnChange={(e) => dispatch(updateQuantity(parseInt(e.target.value)))} />
                <ButtonComponent label="Add Cart" className="btn btn-primary mt-4 align-self-center" OnPress={() => addCartHandler(thisProduct)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <CardComponent
        type="detail"
        title={thisProduct.title}
        category={thisProduct.category}
        description={thisProduct.description}
        image={thisProduct.image}
        price={thisProduct.price}
        quantity={thisProduct.quantity}
        OnChangeField={(e) =>
          dispatch(updateQuantity(parseInt(e.target.value)))
        }
        OnCart={() => addCartHandler(thisProduct)}
      /> */}
    </div>
  );
};

export default ProductDetailPage;
