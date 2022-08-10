import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// get a User
export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    // remove password from response
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    const { password, ...safeUserInfos } = user._doc;
    res.json(safeUserInfos);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find();
    users = users.map((user)=>{
      const {password, ...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id) {
    try {
      // modification du mot de passe
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash;
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_KEY, {expiresIn: "2h"});
      res.status(200).json({user, token});
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res
      .status(403)
      .json({ message: "Vous pouvez modifier uniquement votre profil" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      res.status(200).json("Utilisateur supprimé avec succès");
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res
      .status(403)
      .json({ message: "Vous pouvez supprimer uniquement votre profil" });
  }
};

// Follow a User

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
};

// unfollow a User

export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json({ message: "Vous ne pouvez pas vous désabonner vous-même" });
  } else {
    try {
      const unFollowUser = await UserModel.findById(id);
      const unFollowingUser = await UserModel.findById(_id);

      // si l'utilisateur est déjà suivi
      if (unFollowUser.followers.includes(_id)) {
        // suppression de l'utilisateur à la liste des followers de l'utilisateur qu'il ne veut plus suivre
        await unFollowUser.updateOne({$pull : {followers: _id}})
        // suppression de l'utilisateur unfollowed à la liste des utilisateurs que suit l'utilisateur
        await unFollowingUser.updateOne({$pull : {following: id}})
        res.status(200).json("Vous ne suivez plus cet utilisateur");
      } else {
        res.status(403).json({ message: "Vous ne suivez pas cet utilisateur" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
};
