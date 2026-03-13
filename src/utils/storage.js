const USER_KEY = "dpr_app_users";
const SESSION_KEY = "dpr_app_current_user";

function readUsers() {
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  try {
    window.localStorage.setItem(USER_KEY, JSON.stringify(users));
  } catch {
    // ignore quota / private mode errors in this demo
  }
}

export function registerUser(user) {
  const users = readUsers();
  if (users.some((u) => u.email === user.email)) {
    throw new Error("An account with this email already exists.");
  }
  const next = [...users, user];
  writeUsers(next);
  setCurrentUser({ email: user.email, name: user.name });
  return user;
}

export function findUserByEmail(email) {
  return readUsers().find((u) => u.email === email) || null;
}

export function setCurrentUser(user) {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
}

export function getCurrentUser() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

