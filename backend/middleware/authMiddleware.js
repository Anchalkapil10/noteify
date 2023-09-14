import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")      //pass for protection bearer
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //token to be verified & Secret key used to sign the token

      req.user = await User.findById(decoded.id).select("-password"); // find in db id if id find not return password 

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };

/*  if the authorization header of an HTTP request is present and if it starts with the string "Bearer"
try -


The code token = req.headers.authorization.split(" ")[1]; 

is used to extract the token from the authorization header of an HTTP request. 
The authorization header is a way of sending credentials to the server, such as an access token or a username and password. 
The authorization header usually follows this format:

Authorization: <type> <credentials>

For example, if the type is Bearer and the credentials are a token, the header would look like this:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

The split(" ") method is used to split the header value by a space character and return an array of two elements: the type and the credentials. 
The [1] index is used to access the second element of the array, which is the token. 
Therefore, the code token = req.headers.authorization.split(" ")[1]; assigns the token value to the variable token.

This code is a middleware function that verifies a JSON Web Token (JWT) and retrieves the user information from the database. 
Here’s what each line of code does:

const decoded = jwt.verify(token, process.env.JWT_SECRET); 

This line verifies the JWT using the jwt.verify() method, which takes in two arguments: the token to be verified and the secret key used to sign the token. 
The method returns the decoded payload if the verification is successful.

req.user = await User.findById(decoded.id).select("-password"); 
This line retrieves the user information from the database using the User.findById() method, which takes in the user ID as an argument. 
The .select("-password") method is used to exclude the password field from the returned user object.

next(); This line calls the next middleware function in the request-response cycle.

*/
