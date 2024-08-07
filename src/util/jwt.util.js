import jwt from "jsonwebtoken";

export const verifyJwtToken = async () => {
  try {
    const token = localStorage.getItem("token");
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
    return true;
  } catch (err) {
    //만료 혹은 유효하지 않은 토큰인 경우
    return false;
  }
};
