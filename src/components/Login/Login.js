import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../common/Input/Input';
import loginUser from '../../services/loginService';
import './Login.css';
import { toast } from 'react-toastify';
import { useAuth, useAuthActions } from '../../Providers/AuthProvider';
import { useQuery } from '../../hooks/useQuery';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('this field is required !'),
  password: Yup.string().required('this field is required !'),
});

export default function LoginForm() {
  const setAuth = useAuthActions();
  const auth = useAuth();
  const navigate = useNavigate();
  const query = useQuery();
  const redirect = query.get('redirect') || '/';

  useEffect(() => {
    if (auth) {
      navigate(redirect);
    }
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      navigate(redirect);
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="loginFromContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input label="Email" name="email" type="email" formik={formik} />
        <Input
          label="Password"
          name="password"
          formik={formik}
          type="password"
        />
        <button className="btn" disabled={!formik.isValid} type="submit">
          Login
        </button>
        <Link to={`/signup?redirect=${redirect}`}>
          <p>Still not registred?</p>
        </Link>
      </form>
    </div>
  );
}
