import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../common/Input/Input';
import signupUser from '../../services/signupService';
import './Signup.css';
import { toast } from 'react-toastify';
import { useAuth, useAuthActions } from '../../Providers/AuthProvider';
import { useQuery } from '../../hooks/useQuery';

const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('This field is required !'),
  email: Yup.string()
    .email('Invalid email format !')
    .required('This field is required !'),
  phoneNumber: Yup.string()
    .required('This field is required !')
    .matches(/^[0-9]{11}$/, 'Invalid phone number !')
    .nullable(),
  password: Yup.string()
    .required('This field is required !')
    .min(5, 'Your password must be longer than 5 characters !')
    .max(25)
    .matches(/^(?=.{6,})/, 'Must Contain 6 Characters !')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      'Must Contain One Uppercase, One Lowercase !'
    )
    .matches(/^(?=.{6,20}$)\D*\d/, 'Must Contain One Number !'),
  passwordConfirm: Yup.string()
    .required('This field is required !')
    .oneOf([Yup.ref('password'), null], 'Passwords must match !'),
});

export default function SignupForm(props) {
  const query = useQuery();
  const redirect = query.get('redirect') || '/';
  const setAuth = useAuthActions();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate(redirect);
    }
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    const userData = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
    };
    try {
      const { data } = await signupUser(userData);
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
    <div className="fromContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input label="UserName" name="name" formik={formik} />
        <Input label="Email" name="email" type="email" formik={formik} />
        <Input
          label="Phone Number"
          name="phoneNumber"
          formik={formik}
          type="tel"
        />
        <Input
          label="Password"
          name="password"
          formik={formik}
          type="password"
        />
        <Input
          label="ConfirmPassword"
          name="passwordConfirm"
          formik={formik}
          type="password"
        />
        <button className="btn" disabled={!formik.isValid} type="submit">
          Sign Up
        </button>
        <Link to={`/login?redirect=${redirect}`}>
          <p>Already logged in?</p>
        </Link>
      </form>
    </div>
  );
}
