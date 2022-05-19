import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useAuth } from '../Providers/AuthProvider';

export default function ProfilePage() {
  const auth = useAuth();
  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          {auth ? (
            <>
              <section className="cartSummery">
                <h2 style={{ marginBottom: '30px' }}>{auth.name}</h2>
                <div>
                  <Link to="/profile">Your account</Link>
                </div>
                <div>
                  <Link to="/checkout">Orders</Link>
                </div>
              </section>
              <section className="cartItemList">
                <h2>Personal Information</h2>
                <p>Username : {auth.name}</p>
                <p>Email : {auth.email}</p>
                <p>Phone Number : {auth.phoneNumber}</p>
              </section>
            </>
          ) : (
            <p>Please Login !</p>
          )}
        </section>
      </main>
    </Layout>
  );
}
