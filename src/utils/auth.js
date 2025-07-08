// Simple localStorage-based auth for demo only
// Store all users in localStorage as an array
export function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getUser() {
  // Get the currently logged in user
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

export function findUserByEmailAndPassword(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return (
    users.find((u) => u.email === email && u.password === password) || null
  );
}

export function clearUser() {
  localStorage.removeItem("currentUser");
}
