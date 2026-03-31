import UserLayout from "@/layout/userLayout";
import React, { useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/router";
import useAppStore from "@/store/useAppStore";

export default function Auth() {
  const { loginUser, registerUser, verifyUser, forgotPassword, user } = useAppStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    code: "",
  });
  const [formState, setFormState] = useState(0);

  const switchFormState = (state) => {
    setFormState(state);
  };

  const getTitle = () => {
    switch (formState) {
      case 0:
        return "Sign In";
      case 1:
        return "Sign Up";
      case 2:
        return "Forgot Password";
      case 3:
        return "Verify OTP";
      default:
        return "Sign In";
    }
  };

  const getButtonText = () => {
    switch (formState) {
      case 0:
        return "Sign In";
      case 1:
        return "Sign Up";
      case 2:
        return "Send OTP";
      case 3:
        return "Verify OTP";
      default:
        return "Submit";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    let data;
    e.preventDefault();
    switch (formState) {
      case 0:
        data = await loginUser(formData);
        break;
      case 1:
        data =await registerUser(formData);
        break;
      case 2:
        data = await forgotPassword(formData);
        break;
      case 3:
        data = await verifyUser(formData);
        break;
      default:
        return "Submit";
    }

    if(user){
      router.push("/dashboard");
    }
  };

  return (
    <UserLayout>
      <div className={style.container}>
        <div className={style.mainContainer}>
          <div className={style.leftContainer}>
            <h1>{getTitle()}</h1>
            <form onSubmit={handleSubmit}>
              {formState === 1 && (
                <input
                  key="username"
                  className={style.input}
                  type="name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              )}

              {(formState === 0 || formState === 1 || formState === 2) && (
                <input
                  key="email"
                  className={style.input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              )}

              {(formState === 0 || formState === 1) && (
                <input
                  key="password"
                  className={style.input}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              )}

              {formState === 3 && (
                <input
                  key="code"
                  className={style.input}
                  type="number"
                  name="code"
                  placeholder="Code"
                  value={formData.code}
                  onChange={handleChange}
                />
              )}
              <button className={style.submitButton} type="submit">
                {getButtonText()}
              </button>
            </form>

            {formState === 1 && (
              <span
                className={style.authLink}
                onClick={() => switchFormState(0)}
              >
                Already have an account? <a>Sign In</a>
              </span>
            )}

            {formState === 0 && (
              <>
                <span
                  className={style.authLink}
                  onClick={() => switchFormState(2)}
                >
                  <a>Forgot Password ?</a>
                </span>

                <span
                  className={style.authLink}
                  onClick={() => switchFormState(1)}
                >
                  {" "}
                  Don&apos;t have an account? <a>Register</a>
                </span>
              </>
            )}

            {formState === 2 && (
              <span
                className={style.authLink}
                onClick={() => switchFormState(0)}
              >
                <a>Back to Sign In</a>
              </span>
            )}
          </div>

          <div className={style.rightContainer}></div>
        </div>
      </div>
    </UserLayout>
  );
}
