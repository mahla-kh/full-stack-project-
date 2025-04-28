import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useSignup } from "../featuers/authentication/useSignup";
import SpinnerMini from "../ui/SpinnerMini";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("ایمیل نامعتبر است")
    .required("وارد کردن ایمیل الزامی است"),
  fullName: yup.string().required("وارد کردن نام و نام خانوادگی الزامی است"),
  phone: yup.string().required("وارد کردن شماره تلفن الزامی است"),
  password: yup
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر داشته باشد")
    .matches(/[a-z]/, "باید حداقل یک حرف کوچک داشته باشد")
    .matches(/[A-Z]/, "باید حداقل یک حرف بزرگ داشته باشد")
    .matches(/[0-9]/, "باید حداقل یک عدد داشته باشد")
    .matches(/[^a-zA-Z0-9]/, "باید حداقل یک کاراکتر ویژه داشته باشد")
    .required("وارد کردن رمز عبور الزامی است"),
  remember: yup.boolean(),
});

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit({ fullName, email, password, phone }) {
    // console.log("submit");
    // console.log(fullName, email, password, phone);
    signup({ fullName, email, password, phone }, { onSettled: reset });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 max-w-lg mt-15 mx-auto bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">ایجاد حساب کاربری</h2>
      <p className="text-center text-gray-600">یه متن !</p>

      <div>
        <label className="block text-sm font-medium text-gray-700">ایمیل</label>
        <input
          {...register("email")}
          className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          نام و نام خانوادگی
        </label>
        <input
          {...register("fullName")}
          className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          شماره موبایل
        </label>
        <input
          {...register("phone")}
          className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300"
        />
        <p className="text-red-500 text-sm">{errors.phone?.message}</p>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">
          رمز عبور
        </label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-8 left-2 flex cursor-pointer items-center text-gray-700"
        >
          {showPassword ? (
            <IoEyeOutline size={20} />
          ) : (
            <IoEyeOffOutline size={20} />
          )}
        </button>
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
        <p className="text-xs text-gray-500">
          رمز عبور شما باید حداقل ۸ کاراکتر داشته باشد، شامل یک حرف بزرگ، یک حرف
          کوچک، یک عدد و یک کاراکتر ویژه ( @ ، #).
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("remember")}
          className="h-4 w-4 text-indigo-600"
        />
        <span className="text-gray-700">مرا به خاطر بسپار</span>
      </div>

      <button
        type="submit"
        onClick={() => console.log("clicked")}
        disabled={isLoading}
        className="w-full flex justify-around bg-sky-300 text-white py-2 cursor-pointer rounded-md hover:bg-gray-800 transition"
      >
        {!isLoading ? "تکمیل اطلاعات" : <SpinnerMini />}
      </button>
    </form>
  );
}
