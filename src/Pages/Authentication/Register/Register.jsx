import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const AxiosPublic = useAxios();
  const navigate = useNavigate()
  const [profilePicture, setProfilePicture] = useState("")

  const handleProfilePic = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgApiKey}`, formData);
    setProfilePicture(res.data.data.url)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (userCredential) => {
        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
          icon: "success",
          confirmButtonText: "Continue",
          timer: 2000,
          timerProgressBar: true,
        });


        //  save user information in database
        const UserInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        }
        const res = await AxiosPublic.post('/users', UserInfo);
        console.log(res.data);

        // Update user information in firebase
        const profileData = {
          displayName: data.name,
          photoURL: profilePicture
        }
        updateUserProfile(profileData)
          .then(() => {
            console.log("name and photo are updated")

          }).catch((error) => {
            console.error(error)
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
          {/* Name field */}
          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Enter your name"
            {...register("name")}

          />
          {/* Profile Picture field */}
          <label className="label">Profile Picture</label>
          <input
            onChange={handleProfilePic}
            type="file"
            className="input"
            placeholder="Upload your profile picture"

          />

          {/* Email field */}
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

    </div>
  );
};

export default Register;
