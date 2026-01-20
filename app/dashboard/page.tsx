"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/users/users-table";
import { UserDialog } from "@/components/users/user-dialog";
import { DeleteUserDialog } from "@/components/users/delete-user-dialog";
import { UsersPagination } from "@/components/users/users-pagination";
import type { User } from "@/types/user";

export default function DashboardPage() {
  const params = useSearchParams();
  const page = Number(params.get("page") || 1);

  const { users, totalPages, addUser, editUser, removeUser } = useUsers(page);
  const { logout } = useAuth();

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <div className="space-x-2">
          <Button onClick={() => setOpenCreate(true)}>Novo Usuário</Button>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      <UsersTable
        users={users}
        onEdit={setEditingUser}
        onDelete={setDeletingUser}
      />

      <UsersPagination page={page} totalPages={totalPages} />

      {openCreate && (
        <UserDialog
          open={openCreate}
          onOpenChange={setOpenCreate}
          title="Criar Usuário"
          onSubmit={(data) => {
            addUser(data);
            setOpenCreate(false);
          }}
        />
      )}

      {editingUser && (
        <UserDialog
          open={!!editingUser}
          onOpenChange={() => setEditingUser(null)}
          title="Editar Usuário"
          initialData={editingUser}
          onSubmit={(data) => {
            editUser(Number(editingUser.id), data);
            setEditingUser(null);
          }}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          open={!!deletingUser}
          onOpenChange={() => setDeletingUser(null)}
          userName={`${deletingUser.first_name} ${deletingUser.last_name}`}
          onConfirm={() => {
            removeUser(Number(deletingUser.id));
            setDeletingUser(null);
          }}
        />
      )}
    </div>
  );
}
