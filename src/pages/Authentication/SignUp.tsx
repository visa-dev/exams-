import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UniLogo from '../../images/logo/uni_logo.png';
import ApiService from '../../Api/ApiService.ts';
import Swal from 'sweetalert2';

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').matches(/^\d{4}\/[A-Za-z]+\/\d+$/, 'Invalid username format (e.g., 2019/ICT/33)'),
  faculty: Yup.string().required('Faculty is required'),
  department: Yup.string().required('Department is required'),
  year: Yup.string().required('Year is required'),
  semester: Yup.string().required('Semester is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Mobile number is too short')
    .required('Mobile number is required'),
  password: Yup.string().min(6, 'Password too short').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ""], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUp = () => {

  const api = new ApiService();

  return (
    <Formik
      initialValues={{
        username: '',
        faculty: '',
        department: '',
        year: '',
        semester: '',
        address: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        role:'STUDENT'
      }}
      validationSchema={SignUpSchema}
      onSubmit={ async (values : any) => {
        try {
          const response=  await api.post("/api/auth/register", values);
          if (response.jwt!=null) {
            localStorage.setItem('token', response.jwt);
            // Success response
            Swal.fire({
              title: 'Success!',
              text: 'You have signed up successfully!',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              // Redirect to login page after successful signup
              window.location.href = '/dashboard';
            });
          } else {
            // Failure response
            Swal.fire({
              title: 'Error!',
              text: response.data.message || 'Something went wrong. Please try again.',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false
            });
          }
        }catch (error: any) {
          // Handle any errors during the request
          Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message || 'Network error. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }}
    >
      {() => (
        <Form>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-wrap items-start">
              <div className="hidden w-full xl:block xl:w-1/2">
                <div className="py-17.5 px-26 text-center">
                  <Link className="mb-5.5 inline-block" to="/">
                    <img className="hidden dark:block w-50" src={UniLogo} alt="Logo" />
                    <img className="dark:hidden w-50" src={UniLogo} alt="Logo" />
                  </Link>
                  <p className="2xl:px-20">
                    <strong>University of Vavuniya Exam Application Automated Tool</strong> streamlines the exam
                    application process, making registration easy, efficient, and reliable.
                  </p>
                </div>
              </div>

              <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                  <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    SIGN UP
                  </h2>

                  {/* Name */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">User Name</label>
                    <Field
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage name="username" component="div" className="text-danger" />
                   </div>

                  {/* Faculty and Department */}
                  <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">Faculty</label>
                      <Field
                        as="select"
                        name="faculty"
                        className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Faculty</option>
                        <option value="Applied">Applied</option>
                        <option value="Business">Business</option>
                        <option value="Technology">Technology</option>
                      </Field>
                      <ErrorMessage name="faculty" component="div" className="text-danger" />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">Department</label>
                      <Field
                        as="select"
                        name="department"
                        className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="Maths">Maths</option>
                      </Field>
                      <ErrorMessage name="department" component="div" className="text-danger" />
                    </div>
                  </div>

                  {/* Year and Semester */}
                  <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">Year</label>
                      <Field
                        as="select"
                        name="year"
                        className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Year</option>
                        <option value="3">3 Year</option>
                        <option value="4">4 Year</option>
                      </Field>
                      <ErrorMessage name="year" component="div" className="text-danger" />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">Semester</label>
                      <Field
                        as="select"
                        name="semester"
                        className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Semester</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </Field>
                      <ErrorMessage name="semester" component="div" className="text-danger" />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Address</label>
                    <Field
                      name="address"
                      type="text"
                      placeholder="Enter your address"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage name="address" component="div" className="text-danger" />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  {/* Mobile */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Mobile</label>
                    <Field
                      name="mobile"
                      type="text"
                      placeholder="Enter your mobile"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage name="mobile" component="div" className="text-danger" />
                  </div>

                  {/* Password and Confirm Password */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Re-type Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  </div>

                  {/* Submit Button */}
                  <div className="mb-5">
                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      Create account
                    </button>
                  </div>

                  {/* Google Signup */}
                  <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign in with Google
                </button>

                  <div className="mt-6 text-center">
                    <p>
                      Already have an account?{' '}
                      <Link to="/auth/signin" className="text-primary">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
