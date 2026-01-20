"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserFormData = {
  first_name: string;
  last_name: string;
  email: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => void;
  initialData?: UserFormData;
  title: string;
};

export function UserDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
}: Props) {
  const { register, handleSubmit, reset } = useForm<UserFormData>({
    defaultValues: initialData,
  });

  function handleClose(open: boolean) {
    onOpenChange(open);
    if (!open) reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Primeiro Nome</Label>
            <Input {...register("first_name")} required />
          </div>

          <div>
            <Label>Último Nome</Label>
            <Input {...register("last_name")} required />
          </div>

          <div>
            <Label>Email</Label>
            <Input {...register("email")} type="email" required />
          </div>

          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
