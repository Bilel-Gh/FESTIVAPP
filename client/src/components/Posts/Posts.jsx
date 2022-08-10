import React, { useEffect, useRef, useState } from 'react';
import "./Posts.scss";
import { useSelector, useDispatch } from "react-redux";
import Post from '../Post/Post';
import { getTimelinePosts } from '../../actions/postAction';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const [filterFestival, setFilterFestival] = useState("Tous");
  const filterPosts = useRef()

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // filter posts
    // si le filtre est Mes amis
    setFilterFestival(filterPosts.current.value);
  }

  if(!posts) return 'Pas de posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)

  if (filterFestival === "Tous") {
    // filtrer les posts dans l'ordre crhonologique de post.createdAt
    posts = posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
  } else if (filterFestival === "Mes amis") {
    // afficher tous les posts sauf les miens
    posts = posts.filter((post) => post.userId !== user._id);
    posts = posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
  } else if (filterFestival === "Mes posts") {
    // afficher uniquement mes posts
    posts = posts.filter((post) => post.userId === user._id);
    posts = posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
  } else { 
    posts = posts.filter((post)=> post.festival===filterFestival) 
    posts = posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
  }
  
  return (
    <div className="Posts">
      {/* formulaire pour filtrer les posts */}
      <form className="Posts__filter">
        <div>
          <select ref={filterPosts} name="" id="">
            <option value="Tous">Tous</option>
            <option value="Mes posts">Mes posts</option>
            <option value="Mes amis">Mes amis</option>
            <option value="Solidays">Solidays</option>
            <option value="Coachella">Coachella</option>
            <option value="Tomorrowland">Tomorrowland</option>
          </select>
        </div>
        {/* button submit */}
          <button type="submit" onClick={handleSubmit} className='btn btn-primary'>Filtrer</button>
      </form>
      {loading
        ? "Récupération des posts...."
        :
        // reourner les posts dans l'ordre
        posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  )
}

export default Posts