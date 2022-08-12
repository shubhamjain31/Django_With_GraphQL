import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Author from './pages/Author';
import Authors from './pages/Authors';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Actors from './pages/Actors';
import Actor from './pages/Actor';

function App() {
  return (
    <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<Authors/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/create-author" element={<Author/>} />
                    <Route path="/edit-author/:authorId" element={<Author/>} />
                    <Route path="authors" element={<Authors/>} />
                    <Route path="posts" element={<Posts/>} />
                    <Route path="/create-post" element={<Post/>} />
                    <Route path="/edit-post/:postId" element={<Post/>} />
                    <Route path="actors" element={<Actors/>} />
                    <Route path="/create-actor" element={<Actor/>} />
                    <Route path="/edit-actor/:actorId" element={<Actor/>} />
                </Routes>
                <ToastContainer position="top-right" autoClose={2000} />
            </div>
    </Router>
        
  );
}

export default App;
