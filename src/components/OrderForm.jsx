import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { emptyCartItems } from "../store/cart";
import { addOrders } from "../store/order";

const OrderForm = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, register, errors } = useForm();

  const orderHandler = useCallback((values) => {
    const orderData = {
      items: cartItems,
      email: values.email,
      totalAmount,
    }
    dispatch(addOrders(orderData));
    dispatch(emptyCartItems());
    history.push("/");
  }, [dispatch, totalAmount, cartItems, history]);

  return (
    <form onSubmit={handleSubmit(orderHandler)}>
      <div className="row mt-4">
        <div className="col-2">Email: </div>
        <div className="col-6">
          <div className="form-group">
            <input
              className="form-control"
              name="email"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })}
            />
            <span className="text-danger">{errors.email && errors.email.message}</span>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <button type="submit" className="btn btn-success">ORDER NOW</button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default OrderForm;