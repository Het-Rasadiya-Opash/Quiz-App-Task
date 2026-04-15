import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isExists = await userModel.findOne({ email });

    if (isExists) {
      return res.status(422).json({
        success: false,
        message: "User already exists with email",
        status: "failed",
      });
    }
    const user = await userModel.create({
      email,
      password,
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
    );
    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      status: "success",
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error - Register User",
      status: "success",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        status: "failed",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        status: "failed",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
    );
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "User loggedin successfully",
      status: "success",
      user: {
        _id: user._id,
        role: user.role,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error - Login User",
      status: "success",
    });
  }
};

export const logoutUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "Logged out ",
    });
  }
  res.cookie("token", "");
  res.clearCookie("token");
  res.status(200).json({
    message: "Logged out successfully",
  });
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      message: "User Fetch successfully",
      status: "success",
      user: {
        _id: user._id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error - User fetch",
      status: "success",
    });
  }
};
