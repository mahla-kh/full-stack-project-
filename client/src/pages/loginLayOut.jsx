import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../featuers/authentication/useLogin";
import SpinnerMini from "../ui/SpinnerMini";
import { Link } from "react-router-dom";
import { useUser } from "../featuers/authentication/useUser";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function loginLayOut() {
  const { user } = useUser();
  // console.log(user ? user.email : "هعی");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "test@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const { login, isLoading } = useLogin();
  console.log("isLoading:", isLoading);

  function submitHandler(data) {
    console.log("data :", data);
    const email = data.email;
    const password = data.password;
    login({ email, password }, { onSettled: reset });
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex mt-15 flex-col mx-auto w-[80%] sm:w-[50%] items-center justify-center space-y-4 bg-white p-6 rounded-2xl shadow-lg"
    >
      <div>
        <span>Sewing Project</span>
      </div>
      <input
        type="email"
        {...register("email", {
          required: "ایمیل الزامی است",
        })}
        disabled={isLoading}
        autoComplete="usename"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="ایمیل خود را وارد کنید"
      />

      <span className="text-red-500 flex">
        {errors.email && errors.email.message}
      </span>

      <input
        type="password"
        {...register("password", {
          required: "پسورد را وارد کنید",

          minLength: { value: 8, message: "رمز عبور باید ۸ کاراکتر باشد" },
        })}
        disabled={isLoading}
        autoComplete="current-password"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="********"
      />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}

      <Link className="font-semibold" to="/signup">
        حساب ندارید؟ <span className="text-teal-600">یکی بسازید !</span>
      </Link>
      <button
        onClick={() => console.log("clicked")}
        disabled={isLoading}
        type="submit"
        className="w-full flex align-center justify-around bg-sky-300 text-white p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-sky-800"
      >
        {!isLoading ? "ورود" : <SpinnerMini />}
      </button>
    </form>
  );
}

export default loginLayOut;
