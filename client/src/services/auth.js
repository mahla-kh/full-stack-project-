import supabase from "./supabase";

// export async function signup({ email, password, fullName, phone }) {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: { fullName, phone },
//     },
//   });
//   if (error) throw new Error(error.message);
//   return data;
// }

export async function signup({ username, email, password, phoneNumber }) {
  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, phoneNumber }),
  });
  if (!res.ok) throw new Error("sign up failed");
  const data = await res.json();
  localStorage.removeItem("token");
  localStorage.setItem("token", data.token);
  return data;
}

// export async function login({ email, password }) {
//   let { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) throw new Error(error.message);
//   return data;
// }

export async function login({ email, password }) {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  const data = await res.json();
  localStorage.removeItem("token");
  localStorage.setItem("token", data.token);
  return data;
}
// export async function getCurrentUser() {
//   const { data: session } = await supabase.auth.getSession();
//   if (!session.session) return null;

//   const { data, error } = await supabase.auth.getUser();

//   if (error) throw new Error(error.message);
//   return data?.user;
// }
export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    throw new Error(error.message || "Something went wrong");
  }

  const data = await res.json();
  // console.log("getCurrentUser", data);
  return data;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
