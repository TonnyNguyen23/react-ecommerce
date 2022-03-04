import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addCart, deleteCart } from "../redux/action";

const Cart = () => {
  const carts = useSelector((state) => state.cart);
  console.log(carts);

  const dispatch = useDispatch();

  const handleAddToCart = (cart) => {
    dispatch(addCart(cart));
  };

  const handleRemoveToCart = (cart) => {
    dispatch(deleteCart(cart));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center lead fw-bolder">
        Your Carts ({carts.length})
      </h2>
      {!carts.length && (
        <div className="alert alert-secondary text-center" role="alert">
          Your orders is empty
        </div>
      )}
      <div className="row">
        <div className="col-md-8">
          {!!carts.length &&
            carts.map((cart) => (
              <div className="card mb-2 p-2 w-100" key={cart.id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={cart.image}
                      className="img-fluid rounded-start"
                      style={{ height: "240px" }}
                      alt={cart.title}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{cart.title}</h5>
                      <div>
                        <span className="card-text me-2">{cart.price}</span>x
                        <span className="card-text me-2 ms-2">{cart.qty}</span>=
                        <span className="card-text ms-2">
                          {cart.price * cart.qty}
                        </span>
                      </div>

                      <div>
                        <button
                          className="btn btn-sm btn-outline-dark me-2"
                          onClick={() => handleRemoveToCart(cart)}
                        >
                          -
                        </button>

                        <button
                          className="btn btn-sm btn-outline-dark "
                          onClick={() => handleAddToCart(cart)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="col-md-4">
          <ul class="list-group text-center">
            <li class="list-group-item active" aria-current="true">
              Orders ({carts.reduce((total, cart) => total + cart.qty, 0)})
            </li>
            <li class="list-group-item">
              <b>Total price: </b>$
              {carts.reduce((total, cart) => total + cart.price * cart.qty, 0)}
            </li>
            <li class="list-group-item">
              <button className="btn btn-block btn-dark btn-sm">Order</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
