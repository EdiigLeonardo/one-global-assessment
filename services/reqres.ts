const API_URL = process.env.REQRES_API_URL;
const API_KEY = process.env.REQRES_API_KEY;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY || ""
});

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function fetchUsers(page: number) {
  const res = await fetch(`${API_URL}/users?page=${page}`);
  return res.json();
}

export async function createUser(data: unknown) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUser(id: number, data: unknown) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUser(id: number) {
  await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
}
export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}
