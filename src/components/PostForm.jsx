// ✅ src/components/PostForm.js
import React, { useState } from 'react';

const PostForm = ({ onAddPost, editingPost, onUpdatePost, onCancelEdit }) => {
  const [name, setName] = useState(editingPost ? editingPost.name : '');
  const [title, setTitle] = useState(editingPost ? editingPost.title : '');
  const [body, setBody] = useState(editingPost ? editingPost.body : '');

  // Update form fields when editingPost changes
  React.useEffect(() => {
    if (editingPost) {
      setName(editingPost.name || '');
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setName('');
      setTitle('');
      setBody('');
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !body.trim()) {
      alert('Please enter your name, title and body!');
      return;
    }
    if (editingPost) {
      onUpdatePost({ ...editingPost, name, title, body });
    } else {
      onAddPost({ name, title, body });
    }
    setName('');
    setTitle('');
    setBody('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white/80 dark:bg-gray-900/80 shadow-xl rounded-2xl px-8 py-8 flex flex-col gap-4 border border-gray-200 dark:border-gray-700 max-w-xl mx-auto animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-2 tracking-tight">
        {editingPost ? 'Edit Post' : 'Create a New Post'}
      </h2>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Your Name</label>
        <input
          type="text"
          placeholder="Your name"
          className="input input-bordered rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Post Title</label>
        <input
          type="text"
          placeholder="Post title"
          className="input input-bordered rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Post Content</label>
        <textarea
          placeholder="Post content"
          className="input input-bordered rounded-lg px-4 py-2 min-h-[100px] focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          rows="4"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="flex gap-4 mt-2 justify-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {editingPost ? 'Update Post' : 'Add Post'}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
