import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/product";
import { addItemToCart } from '../store/cart';

const Product = () => {

  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const addToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <div>
      {products.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 mt-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="col mb-4"
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 bg-warning">
                <img src={product.imgURL} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h6 className="card-subtitle">{product.title}</h6>
                  <p className="card-text">
                    <small className="text-muted">AED {product.price}</small>
                    <br />
                    <small className="text-muted">
                      {product.categoryId.title}
                    </small>
                  </p>
                  <button type="button" className="btn btn-light"
                    onClick={() => addToCart(product)}>ADD TO CART</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
          !isLoading && (
            <div className="alert alert-danger mt-4 text-center" role="alert">
              No Product Found!
            </div>
          )
        )}
    </div>
  );
};

export default Product;
