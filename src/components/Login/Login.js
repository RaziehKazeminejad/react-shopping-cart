import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../common/Input/Input';
import './Login.css';

const initialValues = {
  email: '',
  password: '',
};

const onSubmit = (values) => {
  console.log('Form data', values);
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('پر کردن این فیلد اجباریست !'),
  password: Yup.string().required('پر کردن این فیلد اجباریست !'),
});

export default function LoginForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="fromContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input label="ایمیل" name="email" formik={formik} />
        <Input
          label="رمز عبور"
          name="password"
          formik={formik}
          type="password"
        />
        <button className="btn" disabled={!formik.isValid} type="submit">
          ورود
        </button>
      </form>
    </div>
  );
}
