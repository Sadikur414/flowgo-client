import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { signinUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signinUser(data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h1 className="text-5xl pl-3.5 pt-4 font-bold">Login now!</h1>
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

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button type="submit" className="btn bg-[#CAEB66] mt-4">
            Login
          </button>
          <div className="text-[15px]">
            New here ?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </div>
        </form>
      </div>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
