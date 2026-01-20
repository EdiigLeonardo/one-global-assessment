"use client";

import { useEffect, useState } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/reqres";
import type { User } from "@/types/user";

export function useUsers(page: number) {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers(page).then((res) => {
      setUsers(res.data);
      setTotalPages(res.total_pages);
    });
  }, [page]);

  async function addUser(data: Omit<User, "id">) {
    const newUser = await createUser(data);
    setUsers((prev) => [...prev, { ...data, id: newUser.id } as User]);
  }

  async function editUser(id: number, data: Partial<Omit<User, "id">>) {
    await updateUser(id, data);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
  }

  async function removeUser(id: number) {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return { users, totalPages, addUser, editUser, removeUser };
}
