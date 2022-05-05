import React from 'react';
import Layout from '../Layout/Layout';
import * as data from '../data';
import { useCart, useCartActions } from '../Providers/CartProvider';
import checkInCart from '../utils/checkInCart';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'

export default function HomePage() {
  const { cart } = useCart();
  const dispatch = useCartActions();
  const addProductHandler = (product) => {
    toast.success(`${product.name} به سبد خرید اضافه شد`)
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.products.map((product) => {
            return (
              <section className="product" key={product.id}>
                <div className="productImage">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="productDesc">
                  <p>{product.name}</p>
                  <p>{product.price} تومان</p>
                  <div>
                    {checkInCart(cart, product) ? (
                      <button className="btn primary">
                        <Link to="cart">سبد خرید</Link>
                      </button>
                    ) : (
                      <button
                        className="btn primary"
                        onClick={() => addProductHandler(product)}
                      >
                        افزودن به سبد خرید
                      </button>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
}
