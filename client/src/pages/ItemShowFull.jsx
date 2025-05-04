import React, { useState } from "react";
// import { getOneItem } from "../services/women";
import { useLoaderData } from "react-router-dom";
// import { useGetProduct } from "../featuers/products/useGetProduct";
import { getProduct } from "../services/products";
function ItemShowFull() {
  const product = useLoaderData();
  console.log(product.pictures[0]);
  const [selectedImage, setSelectedImage] = useState(0);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  const sellectedBase64 = arrayBufferToBase64(
    product.pictures[selectedImage].buffer.data
  );

  // if (isLoading) return <div className="text-center mt-10">در حال بارگذاری...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="flex h-full border-1 p-1 pl-3  bg-white border-gray-300 text-gray-600 rounded-lg overflow-auto flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2">
          {product.pictures.map((pic, index) => {
            const base64 = arrayBufferToBase64(pic.buffer.data);
            return (
              <img
                key={pic._id}
                src={`data:image/png;base64,${base64}`}
                alt={`product-${pic._id}`}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === pic._id
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              />
            );
          })}
        </div>
        {/* Main Image */}
        <div className="flex-1">
          <img
            src={`data:image/png;base64,${sellectedBase64}`}
            alt="selected"
            className="w-full  h-[400px] object-contain shadow"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col h-full border-1 p-6 bg-white border-gray-300 text-gray-600 rounded-lg overflow-auto justify-between space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-4">{product.desc}</p>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-xl font-semibold text-cyan-700">
            {product.price} تومان
          </p>
        </div>

        <div className="flex gap-4">
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-blue-700 transition">
            افزودن به سبد خرید
          </button>
          <button className="px-4 py-2 border border-gray-400 rounded-xl hover:bg-gray-100 transition">
            افزودن به علاقه‌مندی‌ها
          </button>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  console.log(params.id);
  const data = await getProduct(params.id);
  return data;
}

export default ItemShowFull;
