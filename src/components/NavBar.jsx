import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems } from "../store/cart";

const NavBar = () => {
  const count = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <nav className="navbar bg-warning">
      <Link className="navbar-brand" to="/product">
        SHOP
      </Link>
      <Link to="/cart">
        <button type="button" className="btn btn-primary">
          Cart <span className="badge badge-light">{count}</span>
        </button>
      </Link>

    </nav>
  );
}

export default NavBar;