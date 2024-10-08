const dbconnection = require("../config/dbconfig");
const bcrypt = require("bcrypt");
const { use } = require("bcrypt/promises");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  const currentTimestamp = new Date();
  currentTimestamp.setHours(currentTimestamp.getHours() + 3); // Adjusting for UTC+3
  const formattedTimestamp = currentTimestamp
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  // Check if all required fields are provided
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST) // Using StatusCodes
      .json({ Msg: "Please provide all required fields." });
  }

  // Check if password is at least 8 characters long
  if (password.length < 8) {
    return res
      .status(StatusCodes.BAD_REQUEST) // Using StatusCodes
      .json({ Msg: "Password should be at least 8 characters long." });
  }

  try {
    // Check if the username or email already exists
    const [user] = await dbconnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        Msg: "Username or Email already exists. Please try with a different username or email.",
      });
    }

    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    await dbconnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password,createdAt) VALUES (?, ?, ?, ?, ?,?)",
      [username, firstname, lastname, email, hashedPassword, formattedTimestamp]
    );

    return res
      .status(StatusCodes.CREATED) // Using StatusCodes
      .json({ Msg: "User created successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Msg: "Internal server error." });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  // console.log(email, password);
  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ Msg: "Please provide the email and password." });
  }

  try {
    // Query the user by email
    const [user] = await dbconnection.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );

    // Check if user exists
    if (user.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "User not found",
      });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Please enter the correct password",
      });
    }

    // Generate JWT token
    const username = user[0].username;
    const userid = user[0].userid;
    const secret = process.env.JWT_SECRET;
    // console.log(username, userid);
    const token = jwt.sign({ username, userid }, secret, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Return the token and success message
    return res.status(StatusCodes.OK).json({
      msg: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Msg: "Internal server error." });
  }
}

function check(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;
  return res.status(StatusCodes.OK).json({ username, userid });
}
module.exports = { login, register, check };
