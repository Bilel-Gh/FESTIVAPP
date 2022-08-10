import "./App.scss"
import Home from "./pages/home/Home";
import NavBar from "./components/navbar/NavBar";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";
import { Toaster } from "react-hot-toast";

import {Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state)=>state.authReducer.authData);
  return (
    <div className="App">
      <Toaster/>
      {/* <div> */}
        {/* <NavBar/>
        <Home/> */}
        {/* <Profile/> */}
      {/* </div> */}
      <Routes>
        <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to='auth'/>} />
        <Route path="/home" element={user ? (
        <div> 
          <NavBar/> 
          <Home/>
        </div>
        ) : <Navigate to='../auth'/>} />
        <Route path="/auth" element={user ? <Navigate to = '../home'/> : <Auth />}></Route>
      <Route path="/profile/:id" element={user ? (
        <div> 
          <NavBar/> 
          <Profile />
        </div>
        ) : <Navigate to='../auth'/>} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Il n'y a rien à voir ici!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
