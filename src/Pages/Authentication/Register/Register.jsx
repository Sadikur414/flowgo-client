import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((userCredential) => {
        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
          icon: "success",
          confirmButtonText: "Continue",
          timer: 2000,
          timerProgressBar: true,
        });
        navigate('/')
      })
      .catch((error) => {
        Swal.fire({
          title: "Registration Failed!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };
  return (
    <div>
      <h1 className="text-5xl pl-3.5 pt-4 font-bold">Register now!</h1>
      <div className="card-body">
        <form className="fieldset" onSubmit={handleSubmit(onSubmit)}>
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter and one number",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <button className="btn bg-[#CAEB66] mt-4">Register</button>
          <div className="text-[15px]">
            Already have an account ?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </div>
        </form>
      </div>
      ;
    </div>
  );
};

export default Register;
