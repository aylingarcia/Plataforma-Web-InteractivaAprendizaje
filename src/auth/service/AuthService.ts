import db from "../../api/db";

const login = async (username: string, password: string) => {
  const { data } = await db.post("/login", { username, password });

  return data;
};

const register = async (
  username: string,
  password: string,
  role: string,
  email: string,
  university: string,
  birthdate: Date,
  gender: string,
) => {
  const { data } = await db.post("/register", {
    username,
    password,
    role,
    email,
    university,
    birthdate,
    gender,
  });

  return data;
};

export default {
  login,
  register,
};
