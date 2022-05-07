import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../common/Input/Input';
import signupUser from '../../services/signupService';
import './Signup.css';
import { toast } from 'react-toastify';
import { useAuthActions } from '../../Providers/AuthProvider';

const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('پر کردن این فیلد اجباریست !'),
  email: Yup.string()
    .email('فرمت ایمیل نادرست است !')
    .required('پر کردن این فیلد اجباریست !'),
  phoneNumber: Yup.string()
    .required('پر کردن این فیلد اجباریست !')
    .matches(/^[0-9]{11}$/, 'شماره موبایل نامعتبر است !')
    .nullable(),
  password: Yup.string()
    .required('پر کردن این فیلد اجباریست !')
    .min(5, 'پسورد باید بیشتر از 5 کاراکتر داشته باشد')
    .max(25)
    .matches(/^(?=.{6,})/, 'پسورد باید بیشتر از 6 کاراکتر داشته باشد')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      'پسورد باید دارای حروف بزرگ و کوچک باشد'
    )
    .matches(/^(?=.{6,20}$)\D*\d/, 'پسورد باید شامل عدد باشد'),
  passwordConfirm: Yup.string()
    .required('پر کردن این فیلد اجباریست !')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
}); 

export default function SignupForm(props) {
  const setAuth = useAuthActions();
  const navigate = useNavigate();

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
      localStorage.setItem('authState', JSON.stringify(data));
      navigate('/');
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
        <Input label="نام کاربری" name="name" formik={formik} />
        <Input label="ایمیل" name="email" type="email" formik={formik} />
        <Input
          label="شماره موبایل"
          name="phoneNumber"
          formik={formik}
          type="tel"
        />
        <Input
          label="رمز عبور"
          name="password"
          formik={formik}
          type="password"
        />
        <Input
          label="تایید رمز عبور "
          name="passwordConfirm"
          formik={formik}
          type="password"
        />
        <button className="btn" disabled={!formik.isValid} type="submit">
          ثبت نام
        </button>
        <Link to="/login">
          <p>از قبل وارد سیستم شده اید؟</p>
        </Link>
      </form>
    </div>
  );
}
