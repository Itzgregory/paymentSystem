export type UserSession = {
  token: string;
  role: string;
  expiry: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};

const getUsers = (): Record<string, UserSession> => {
  try {
    return JSON.parse(localStorage.getItem("users") || "{}");
  } catch {
    return {};
  }
};

const setUsers = (users: Record<string, UserSession>): void => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch {
  }
};

export const setAuthToken = (
  id: string,
  token: string,
  role: string,
  firstName: string,
  lastName: string,
  email: string,
  expiresIn: number = 3600000
): void => {
  if (!id || !token) {
    return;
  }

  const users = getUsers();
  users[id] = {
    token,
    role,
    expiry: Date.now() + expiresIn,
    firstName,
    lastName,
    email,
  };

  // Set all items synchronously
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("activeUser", id);
  localStorage.setItem("userId", id);

  // Verify immediately
  const storedActiveUser = localStorage.getItem("activeUser");
  const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
  if (storedActiveUser !== id || !storedUsers[id]) {
  } else {
  }

  window.dispatchEvent(new Event("storage"));
};
export const getAuthToken = (): string | null => {
  const activeUser = localStorage.getItem("activeUser");
  if (!activeUser) {
    return null;
  }
  const users = getUsers();
  return users[activeUser]?.token || null;
};

export const getUserRole = (): string | null => {
  const activeUser = localStorage.getItem("activeUser");
  const users = getUsers();
  return activeUser ? users[activeUser]?.role || null : null;
};

export const getUserDetails = (): UserSession | null => {
  const activeUser = localStorage.getItem("activeUser");
  if (!activeUser) {
    return null;
  }
  const users = getUsers();
  return users[activeUser] || null;
};

export const isTokenValid = (): boolean => {
  try {
    const users: Record<string, UserSession> = JSON.parse(localStorage.getItem("users") || "{}");
    const activeUser = localStorage.getItem("activeUser");

    if (!activeUser || !users[activeUser]) {
      return false;
    }

    const { token, expiry } = users[activeUser];
    if (!token) {
      return false;
    }

    const isValid = typeof expiry === "number" && Date.now() < expiry;
    if (!isValid) {
    } else if (Date.now() > expiry - 300000) {
    }
    return isValid;

  } catch {
    return false;
  }
};

export const switchUser = (id: string): boolean => {
  const users = getUsers();
  if (users[id]) {
    localStorage.setItem("activeUser", id);
    localStorage.setItem("userId", id);
    window.dispatchEvent(new Event("storage"));
    return true;
  }
  return false;
};

export const clearAuthData = (id: string | null = null): void => {
  if (id) {
    const users = getUsers();
    delete users[id];
    setUsers(users);

    if (localStorage.getItem("activeUser") === id) {
      const remainingUsers = Object.keys(users);
      if (remainingUsers.length > 0) {
        localStorage.setItem("activeUser", remainingUsers[0]);
        localStorage.setItem("userId", remainingUsers[0]);
      } else {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("userId");
      }
    }
  } else {
    localStorage.removeItem("users");
    localStorage.removeItem("activeUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
  }

  window.dispatchEvent(new Event("storage"));
};