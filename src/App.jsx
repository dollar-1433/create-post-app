// ✅ src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import HeaderBar from './components/HeaderBar';
import SiteFooter from './components/SiteFooter';
import ModeSwitcher from './components/ModeSwitcher';
import AuthPage from './pages/AuthPage';
import { saveUser, getUser, clearUser, findUserByEmailAndPassword } from './utils/auth';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const [editingPost, setEditingPost] = useState(null);
  const [user, setUser] = useState(getUser());

  // ✅ Load posts
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ✅ Add post
  const addPost = (post) => {
    axios.post('http://localhost:5000/api/posts', post)
      .then((res) => {
        setPosts((prev) => [res.data, ...prev]);
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  };

  // ✅ Delete post
  const handleDeletePost = (id) => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
      })
      .catch((err) => {
        alert('Error deleting post: ' + err.message);
      });
  };

  // Edit post handler
  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  // Update post handler
  const updatePost = (post) => {
    axios.put(`http://localhost:5000/api/posts/${post.id}`, post)
      .then((res) => {
        setPosts((prevPosts) =>
          prevPosts.map((p) => (p.id === post.id ? res.data : p))
        );
        setEditingPost(null);
      })
      .catch((err) => {
        alert('Error updating post: ' + err.message);
      });
  };

  // ✅ Theme switching
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Auth handler for both sign up and sign in
  const handleAuth = (form) => {
    if (form.mode === 'signup') {
      // Save only if not already registered
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === form.email)) {
        alert('Email already registered. Please sign in.');
        return;
      }
      saveUser(form);
      setUser(form);
    } else if (form.mode === 'signin') {
      const found = findUserByEmailAndPassword(form.email, form.password);
      if (!found) {
        alert('Invalid credentials');
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(found));
      setUser(found);
    }
  };
  const handleSignOut = () => {
    clearUser();
    setUser(null);
  };

  if (!user) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return (
    <div className="App">
      <HeaderBar />
      <div className="flex justify-end mb-4">
        <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all">Sign Out</button>
      </div>
      <ModeSwitcher toggleTheme={toggleTheme} theme={theme} />
      <main className="container">
        <PostForm
          onAddPost={addPost}
          editingPost={editingPost}
          onUpdatePost={updatePost}
          onCancelEdit={() => setEditingPost(null)}
        />
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <PostList posts={posts} onDeletePost={handleDeletePost} onEditPost={handleEditPost} />
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default App;
