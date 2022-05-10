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
                  <Link to="/profile">حساب کاربری</Link>
                </div>
                <div>
                  <Link to="/checkout">سفارشات</Link>
                </div>
              </section>
              <section className="cartItemList">
                <h2>اطلاعات شخصی</h2>
                <p>نام کاربری : {auth.name}</p>
                <p>ایمیل : {auth.email}</p>
                <p>شماره موبایل: {auth.phoneNumber}</p>
              </section>
            </>
          ) : (
            <p>لطفا وارد شوید !</p>
          )}
        </section>
      </main>
    </Layout>
  );
}
