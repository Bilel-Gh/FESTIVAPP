import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";

// crud post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
      await newPost.save();
      res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json("Erreur lors de la création du post");
  }
};

export const getPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        // return post with usrer profile picture
        const user = await UserModel.findById(post.userId
        , {
            _id: 0,
            username: 1,
            profilePicture: 1
        });
        const { password, ...safePostInfos } = post._doc;
        res.status(200).json({...safePostInfos, user});
    } catch (err) {
        res.status(500).json("Erreur lors de la récupération du post");
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(postId);
        // si l'utilisateur n'est pas le propriétaire du post il ne peut pas modifier le post
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post modifié avec succès");
        } else {
            res.status(401).json("Vous n'êtes pas le propriétaire du post");
        }
    } catch (err) {
        res.status(500).json("Erreur lors de la mise à jour du post");
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(postId);
        // si l'utilisateur n'est pas le propriétaire du post il ne peut pas supprimer le post
        if (post.userId === userId) {
            await post.remove();
            res.status(200).json("Post supprimé avec succès");
        } else {
            res.status(401).json("Vous n'êtes pas le propriétaire du post");
        }
    } catch (err) {
        res.status(500).json("Erreur lors de la suppression du post");
    }
}

// like/dislike post

export const likePost = async (req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(postId);
        // si l'utilisateur n'a pas liké ce post il peut le liker
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liké avec succès");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post disliké avec succès");
        }
    } catch (err) {
        res.status(500).json("Erreur lors du like du post");
    }
}

// Get timeline Posts
// inclus les posts de l'utilisteur connecté et les posts des utilisateurs qu'il suit
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id
    try {
      const currentUserPosts = await PostModel.find({ userId: userId });
  
      const followingPosts = await UserModel.aggregate([
        { 
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },

        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  

      res.status(200).json(
        currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt);})
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };

// get all posts by festival value
export const getPostsByFestival = async (req, res) => {
    const {festival} = req.body;
    try {
        const posts = await PostModel.find({ festival: festival });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(`Erreur lors de la récupération des posts`);
    }
}
        