import CardComponent from "../components/CardComponent";
import { useNavigate, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, plusStock, minusStock, decreaseQuantity } from "../redux/productSlice";
import { addCart, updateCartItem } from "../redux/cartSlice";
import React, { useEffect } from "react";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.products);
  const { cart, quantity } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  // const intersection = data.filter((element) => cart.includes(element));
  console.log("cart product", cart);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  const checkItem = (query) => {
    const found = cart.some((el) => el.id === query.id);
    return found;
  };

  const addCartHandler = (item) => {
    const newItem = { ...item, quantity: quantity };
    if (isAuthenticated) {
      if (!checkItem(item)) {
        dispatch(addCart(item));
      } else {
        dispatch(updateCartItem(item));
      }
      // dispatch(decreaseQuantity(newItem));
    } else {
      navigate("/login");
    }
    console.log("item", item);
  };

  return (
    <div className="productList container">
      <h1 className="mt-2">Product List</h1>
      <div class="row d-flex justify-content-center">
        {props.role === "admin"
          ? data.map((product) => {
              return (
                <CardComponent
                  key={product.id}
                  title={product.title}
                  category={product.category}
                  image={product.image}
                  price={product.price}
                  value={product.quantity}
                  OnPlus={() => dispatch(plusStock(product))}
                  OnMinus={() => dispatch(minusStock(product))}
                  quantity={product.quantity}
                  type="admin"
                />
              );
            })
          : data.map((product) => {
              return (
                <CardComponent
                  key={product.id}
                  title={product.title}
                  category={product.category}
                  image={product.image}
                  price={product.price}
                  quantity={product.quantity}
                  OnView={() => navigate(`/product/${product.id}`)}
                  OnCart={() => addCartHandler(product)}
                />
              );
            })}
      </div>
    </div>
  );
};

export default ProductsPage;
