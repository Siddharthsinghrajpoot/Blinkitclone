import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const response = jwt.verify(token, process.env.jwt_secret);

    if (response) {
      req.user = { _id: response.id }; 
      next();
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error from auth" });
  }
}

export default userAuth;
