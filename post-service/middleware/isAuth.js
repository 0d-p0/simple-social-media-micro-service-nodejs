import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.userId;
    req.token=token
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }
};