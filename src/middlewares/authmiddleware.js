import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const authMiddleware = async (req, res, next) => {
  const token = req.headers("Authorization").replace("Berear ", "");
  if (!token) {
    return res.status(401).send({ error: "Access denied not login" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next();
  } catch (error) {
    console.log("Error in middleware", error);
    
  }
};

export default authMiddleware;