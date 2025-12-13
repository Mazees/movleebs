import supabase from "./supabase";

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const logoutUser = async () => {
  const { data, error } = await supabase.auth.signOut();
  return { data, error };
};

export const getAllFeedbacks = async (page, limit) => {
  const from = (page - 1) * limit;
  const to = from + limit;
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);
  return { data, error };
};

export const updateFeedbackStatus = async (id, accepted) => {
  const { data, error } = await supabase
    .from("feedbacks")
    .update({ accepted })
    .eq("id", id)
    .select();
  return { data, error };
};

export const deleteFeedback = async (id) => {
  const { data, error } = await supabase
    .from("feedbacks")
    .delete()
    .eq("id", id);
  return { data, error };
};

export const addFeedback = async (name, email = null, category, message) => {
  const { error } = await supabase
    .from("feedbacks")
    .insert({ name: name, email: email, category: category, message: message });
  return { error };
};
