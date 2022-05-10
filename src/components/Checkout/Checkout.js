import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider';
import { useCart } from '../../Providers/CartProvider';

export default function Checkout() {
  const auth = useAuth();
  const { cart, total } = useCart();

  if (!cart.length)
    return (
      <main className="container">
        <Link to="/"> بزن بریم خرید ;) </Link>
      </main>
    );

  return (
    <main className="container">
      <section className="cartCenter">
        {auth ? (
          <>
            <section className="cartItemList">
              <h3>جزئیات سفارش</h3>
              <p>نام کاربری : {auth.name}</p>
              <p>ایمیل : {auth.email}</p>
              <p>شماره موبایل: {auth.phoneNumber}</p>
            </section>
            <section className="cartSummery">
              {cart &&
                cart.map((c) => {
                  return (
                    <div>
                      {c.name} * {c.quantity} : {c.quantity * c.offPrice}
                    </div>
                  );
                })}
              <hr />
              <div>مبلغ کل : {total}</div>
            </section>
          </>
        ) : (
          <p>لطفا وارد شوید !</p>
        )}
      </section>
    </main>
  );
}
