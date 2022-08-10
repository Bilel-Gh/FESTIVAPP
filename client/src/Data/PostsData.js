import postPic1 from "../img/postpic1.jpg";
import postPic2 from "../img/cover2.png";
import postPic3 from "../img/cover3.png";
import img1 from "../../src/img/profile2.png";
import img2 from "../../src/img/profile3.png";
import img3 from "../../src/img/profile5.png";

export const PostsData = [
    {
        id: 1,
        name: "@Benbecker",
        fullname: "Ben Becker",
        place: "New York, USA",
        profile: img1,
        img: postPic1,
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        likes: 34,
        liked: true,
    },
    {
        id: 2,
        name: "@thomasprice",
        fullname: "Thomas Price",
        place: "Paris, France",
        profile: img2,
        img: postPic2,
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        likes: 3424,
        liked: false,
    },
    {
        id: 3,
        name: "@marclanders",
        fullname: "Marc Landers",
        place: "London, England",
        profile: img3,
        img: postPic3,
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        likes: 543,
        liked: true,
    }
]