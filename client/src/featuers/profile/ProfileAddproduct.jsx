import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useProduct } from "../products/useProduct";
import SpinnerMini from "../../ui/SpinnerMini";

function Addproduct() {
  const [files, setFiles] = useState();
  const { addProduct, isLoading } = useProduct();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  function onSubmit({ title, desc, price }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price);

    for (let i = 0; i < files.length; i++) {
      formData.append("pics", files[i]); // اینجا اسم فیلد باید با بک‌اندت بخونه
    }
    addProduct(formData, { onSettled: reset });
  }
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };
  return (
    <div className="max-w-md mx-auto p-4 ">
      <h1 className="text-2xl font-bold mt-4 mb-4">افزودن محصول جدید</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">عنوان:</label>
          <input
            {...register("title")}
            type="text"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">توضیحات:</label>
          <textarea
            {...register("desc")}
            // value={desc}
            // onChange={(e) => setDesc(e.target.value)}
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">دسته بندی:</label>
          <input
            {...register("category")}
            type="text"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">قیمت:</label>
          <input
            type="number"
            {...register("price")}
            // value={price}
            // onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-row gap-4">
          <label
            htmlFor="file-upload"
            className="flex mb-1 rounded-md text-center py-2 px-3 text-white bg-cyan-600"
          >
            انتخاب فایل‌ها
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? <SpinnerMini /> : "افزودن محصول"}
        </button>
      </form>
    </div>
  );
}

export default Addproduct;
