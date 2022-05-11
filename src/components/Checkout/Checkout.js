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
              <h2>جزئیات صورت حساب</h2>
              <p>نام کاربری : {auth.name}</p>
              <p>ایمیل : {auth.email}</p>
              <p>شماره موبایل: {auth.phoneNumber}</p>
            </section>
            <section className="cartSummery">
              <h2 style={{ marginBottom: '30px' }}>سفارش شما</h2>
              <div className="summeryItem">
                <p>محصول</p>
                <p>جمع جزء</p>
              </div>
              <hr />
              <div>
                {cart &&
                  cart.map((c) => {
                    return (
                      <div key={c.id} className="summeryItem">
                        <p>
                          {c.name} * {c.quantity} :
                        </p>
                        <p> {c.quantity * c.offPrice} تومان</p>
                      </div>
                    );
                  })}
              </div>

              <div className="summeryItem net">
                <p>مبلغ قابل پرداخت</p>
                <p> {total} تومان</p>
              </div>
            </section>
          </>
        ) : (
          <p>لطفا وارد شوید !</p>
        )}
      </section>
    </main>
  );
}
