import supabase from "./supabase";

export async function getWomen() {
  let { data: womenPatterns, error } = await supabase
    .from("womenPatterns")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("women patterns could not be loaded");
  }

  return womenPatterns;
}

export async function updateWomen({ id, isItLiked }) {
  const { error } = await supabase
    .from("womenPatterns")
    .update({ isLiked: isItLiked })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("women patterns (is liked) could not be updated");
  }
}

export async function getOneItem(id) {
  let { data: womenPattern, error } = await supabase
    .from("womenPatterns")
    .select("*") // Fetch all columns
    .eq("id", id) // Filter by ID
    .single(); // Ensure we get only one item

  if (error) {
    console.error(error);
    throw new Error(`Women pattern ${id} could not be loaded`);
  }

  return womenPattern; // Return the single object
}
