import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  removeItemFromCart,
  emptyCartItems,
  getCartItems,
} from "../store/cart";
import OrderForm from "./OrderForm";

const Cart = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const count = useSelector((state) => state.cart.count);
  const isLoading = useSelector((state) => state.product.isLoading);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const removeItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const removeAllItems = useCallback(() => {
    dispatch(emptyCartItems());
    history.push("/");
  }, [dispatch, history]);

  return (
    <div>
      {count > 0 ? (
        <div className="text-right pt-4">
          <button type="button" onClick={() => removeAllItems()} className="btn btn-danger">CLEAR CART</button>
        </div>
      ) : ""}
      {
        cartItems.length > 0 ? (
          <div className="mt-4">
            <div className="row">
              <div className="col-sm font-weight-bold">TITLE</div>
              <div className="col-sm font-weight-bold">PRICE</div>
              <div className="col-sm font-weight-bold">QUANTITY</div>
              <div className="col-sm font-weight-bold">TOTAL</div>
              <div className="col-sm font-weight-bold">REMOVE</div>
            </div>
            {cartItems.map((cart) => (
              <div className="row mt-2" key={cart.id}>
                <div className="col-sm">{cart.title}</div>
                <div className="col-sm">{cart.price}</div>
                <div className="col-sm">{cart.quantity}</div>
                <div className="col-sm">{cart.total}</div>
                <div className="col-sm">
                  <button type="button" onClick={() => removeItem(cart.id)} className="btn btn-danger">-</button>
                </div>
              </div>
            ))}
            <div className="row mt-2">
              <div className="col-sm font-weight-bold">TOTAL AMOUNT</div>
              <div className="col-sm font-weight-bold">{totalAmount}</div>
            </div>

          </div>
        ) : (
            !isLoading && (
              <div className="alert alert-danger mt-4 text-center" role="alert">
                No Item Added in cart, Please add some!
              </div>
            )
          )
      }
      {
        count > 0 ? (
          <OrderForm />
        ) : ""
      }
    </div >
  );
};

export default Cart;
