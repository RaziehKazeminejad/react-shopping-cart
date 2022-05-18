import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
// import * as data from '../data';
import { useCart, useCartActions } from '../Providers/CartProvider';
import checkInCart from '../utils/checkInCart';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function HomePage() {
  const { cart } = useCart();
  const dispatch = useCartActions();
  const [data, setData] = useState([]);

  const addProductHandler = (product) => {
    toast.success(`${product.title} added to cart!`);
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products?limit=10&skip=10')
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.map((product) => {
            return (
              <section className="product" key={product.id}>
                <div className="productImage">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="productDesc">
                  <p>{product.title}</p>
                  <p>{product.price} $</p>
                  <div>
                    {checkInCart(cart, product) ? (
                      <button className="btn primary">
                        <Link to="cart">Go To Cart</Link>
                      </button>
                    ) : (
                      <button
                        className="btn primary"
                        onClick={() => addProductHandler(product)}
                      >
                        Add To Cart
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
