import Token from "../models/token.model.js";
import User from "../models/user.model.js";
import { compareValue } from "../utils/bcrypt.js";
import { generateJWT } from "../utils/jwt.js";
import { registerSchema, loginSchema } from "../validations/user.validation.js";

export class AuthController {
  static register = async (req, res) => {
    try {
      const registrationData = req.body;

      const { success, error, data } =
        registerSchema.safeParse(registrationData);

      if (!success) {
        const errorMessages = error.errors.map((err) => {
          return {
            field: err.path.join("."),
            message: err.message,
          };
        });

        return res.status(400).json(errorMessages);
      }

      // Check if user already exists
      const userExists = await User.findOne({ email: data.email });

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = new User(data);

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static login = async (req, res) => {
    try {
      const loginData = req.body;

      const { success, error, data } = loginSchema.safeParse(loginData);

      if (!success) {
        const errorMessages = error.errors.map((err) => {
          return {
            field: err.path.join("."),
            message: err.message,
          };
        });

        return res.status(400).json(errorMessages);
      }

      // Check if user exists
      const user = await User.findOne({ email: data.email });

      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Check if password is correct
      const isPasswordValid = await compareValue(data.password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate JWT token (not implemented in this example)
      const token = generateJWT(user._id);
      const newToken = new Token({
        userId: user._id,
        token,
      });

      await newToken.save();

      // Send token to client
      res.status(200).json(token);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static logout = async (req, res) => {
    try {
      await req.token.deleteOne();
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static getUserProfile = async (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
