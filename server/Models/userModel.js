import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
        validator: (value) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        }
    }
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
    default:
      "",
  },
  coverImage: {
    type: String,
    default:
      "",
  },
  job: String,
  ville: String,
  age: Number,
  festivFav: String,
  followers: [],
  following: [],
}, { timestamps: true });

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
