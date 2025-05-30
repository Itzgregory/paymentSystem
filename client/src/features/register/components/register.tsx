"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useRegistration from "../hooks/registerContainer/useRegister";
import styles from "../../login/components/Login.module.css";
import { useRouter } from "next/navigation";

type RegistrationFormData = {
  email: string;
  firstName: string;
  lastName: string;
  otherName: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

const Registration = () => {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const { loading, localError, onSubmit } = useRegistration({
    onSuccess: () => {
      setIsSuccessModalOpen(true);
      reset();
    },
  });

  return (
    <div className={`${styles.loginContainer}`}>
      <h1 className={`${styles.titleDark}`}>Create an Account</h1>
      <div className={`${styles.registerCard}`} style={{ width: "500px" }}>
        <h2 className={`${styles.title}`}>Register</h2>
        {localError && <p className={`${styles.errorText}`}>{localError}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.loginForm}`}>
          <div className={styles.formGroup}>
            <div className={styles.inputBox}>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`${styles.inputField}`}
                placeholder=" "
              />
              <label className={styles.label}>Email</label>
            </div>
            {errors.email && <p className={styles.invalidFeedback}>{errors.email.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputBox}>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "First name must be at least 2 characters" },
                })}
                className={`${styles.inputField}`}
                placeholder=" "
              />
              <label className={styles.label}>First Name</label>
            </div>
            {errors.firstName && <p className={styles.invalidFeedback}>{errors.firstName.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputBox}>
              <input
                type="text"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Last name must be at least 2 characters" },
                })}
                className={`${styles.inputField}`}
                placeholder=" "
              />
              <label className={styles.label}>Last Name</label>
            </div>
            {errors.lastName && <p className={styles.invalidFeedback}>{errors.lastName.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputBox}>
              <input
                type="text"
                {...register("otherName")}
                className={`${styles.inputField}`}
                placeholder=" "
              />
              <label className={styles.label}>Other Name (Optional)</label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputBox} style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                className={`${styles.inputField}`}
                placeholder=" "
              />
              <label className={styles.label}>Password</label>
              <span onClick={() => setShowPassword(prev => !prev)} className={styles.passwordViewHide}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className={styles.invalidFeedback}>{errors.password.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputBox}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: value => value === watch("password") || "Passwords do not match",
                })}
                className={`${styles.inputField}`}
                placeholder=" "
              />
              <label className={styles.label}>Confirm Password</label>
              <span onClick={() => setShowConfirmPassword(prev => !prev)} className={styles.passwordViewHide}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && <p className={styles.invalidFeedback}>{errors.confirmPassword.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("termsAccepted", {
                  required: "You must accept the terms and conditions",
                })}
                className="w-4 h-4"
              />
              <span className="text-sm">
                I agree to the <a href="/terms" className="">terms and conditions</a>.
              </span>
            </label>
            {errors.termsAccepted && <p className={styles.invalidFeedback}>{errors.termsAccepted.message}</p>}
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} global-button items-center`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/login" className={`${styles.signupText}`}>
            Already have an account? Login here.
          </a>
        </div>
      </div>

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-center">Registration Successful!</h3>
            <p className="text-center mb-6">Your account has been created successfully. You can now log in.</p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
