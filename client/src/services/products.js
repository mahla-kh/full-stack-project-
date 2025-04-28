export async function getProduct(id = "680f5fa04ec58f91ac0d0f46") {
  const res = fetch(`http://localhost:3000/product/${id}`);
  if (!res.ok) throw new Error("getting product failed");
  const data = res.json();
  return data;
}

// export async function postProductPic(
//   id = "680f5fa04ec58f91ac0d0f46",
//   formData
// ) {
//   const res = fetch(`http://localhost:3000/product/${id}/pics`, formData, {
//     method: "POST",
//   });
//   if (!res.ok) throw new Error("getting product pics failed");

//   return res.data;
// }

export async function getProductPic(id = "680f5fa04ec58f91ac0d0f46") {
  const res = fetch(`http://localhost:3000/product/${id}/pics`);
  if (!res.ok) throw new Error("getting product pics failed");
  // res is an array of buffers
  return res;
}
// const handleSubmit = () => {
//     const formData = new FormData();
//     for (let i = 0; i < pics.length; i++) {
//       formData.append('pics', pics[i]); // 'pics' باید همون چیزی باشه که بک‌اند انتظار داره
//     }
//     mutate(formData);
//   };

export async function postProduct(formData) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/addproduct", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  console.log(res);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
