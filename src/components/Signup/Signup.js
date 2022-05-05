import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../common/Input/Input';
import './Signup.css';

const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
};

const onSubmit = (values) => {
  console.log('Form data', values);
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

export default function SignupForm() {
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
        <Input label="ایمیل" name="email" formik={formik} />
        <Input
          label="شماره تماس"
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
      </form>
    </div>
  );
}
