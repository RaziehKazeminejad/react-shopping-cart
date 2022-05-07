import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../common/Input/Input';
import loginUser from '../../services/loginService';
import './Login.css';
import { toast } from 'react-toastify';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('پر کردن این فیلد اجباریست !'),
  password: Yup.string().required('پر کردن این فیلد اجباریست !'),
});

export default function LoginForm() {
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      await loginUser(values);
      navigate('/')
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
        <Input label="ایمیل" name="email" type="email" formik={formik} />
        <Input
          label="رمز عبور"
          name="password"
          formik={formik}
          type="password"
        />
        <button className="btn" disabled={!formik.isValid} type="submit">
          ورود
        </button>
        <Link to="/signup">
          <p>هنوز ثبت نام نکرده اید؟</p>
        </Link>
      </form>
    </div>
  );
}
