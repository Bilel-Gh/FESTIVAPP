import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      res.status(400).json({message : "Cet utilisateur existe déjà"});
    }
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_KEY, {expiresIn: "2h"});
    res.status(201).json({user, token});
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if(user)
    {
        const validity = await bcrypt.compare(password, user.password)
        if (!validity) {
          res.status(400).json({message : "Mot de passe incorrect"});
        } else {
          const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_KEY, {expiresIn: "2h"});
          res.status(200).json({user, token});
        }
    }
    else{
        res.status(404).json({message : "L'utilisateur n'existe pas"})
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
