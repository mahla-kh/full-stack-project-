export async function getUserLikes() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/userlikes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("user likes ", data);
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
export async function getAllLikes() {
  const res = await fetch("http://localhost:3000/alllikes");
  const data = await res.json();
  console.log("all likes ", data);
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
export async function addNewLike({ userId, productId }) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/addlike", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, productId }),
  });
  const data = await res.json();
  console.log("new like ", data);
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export async function removeLike({ userId, productId }) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/removelike", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: { userId, productId },
  });
  const data = await res.json();
  console.log("new like ", data);
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
