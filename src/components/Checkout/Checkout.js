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
        <Link to="/"> Let's shopping ;) </Link>
      </main>
    );

  return (
    <main className="container">
      <section className="cartCenter">
        {auth ? (
          <>
            <section className="cartItemList">
              <h2>Account details</h2>
              <p>Username : {auth.name}</p>
              <p>Email : {auth.email}</p>
              <p>Phone Number: {auth.phoneNumber}</p>
            </section>
            <section className="cartSummery">
              <h2 style={{ marginBottom: '30px' }}>Order Summary</h2>
              <div className="summeryItem">
                <p>Product</p>
                <p>Subtotal</p>
              </div>
              <hr />
              <div>
                {cart &&
                  cart.map((c) => {
                    return (
                      <div key={c.id} className="summeryItem">
                        <p>
                          {c.title} * {c.quantity} :
                        </p>
                        <p> {c.quantity * c.discountPercentage} $</p>
                      </div>
                    );
                  })}
              </div>

              <div className="summeryItem net">
                <p>Total</p>
                <p> {total} $</p>
              </div>
            </section>
          </>
        ) : (
          <p>Please Login !</p>
        )}
      </section>
    </main>
  );
}
