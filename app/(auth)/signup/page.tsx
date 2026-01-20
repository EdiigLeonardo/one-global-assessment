"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/auth-schema";
import { login } from "@/services/reqres";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (sessionToken) {
      document.cookie = `session_token=${sessionToken}; path=/`;
      window.location.href = "/dashboard";
    }
  }, [sessionToken]);

  async function onSubmit(data: SignupFormData) {
    const res = await login(data.email, data.password);
    setSessionToken(res.token);
  }

  return (
    <div className="space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Criar conta</h1>
        <p className="text-sm text-muted-foreground">
          Preencha os dados para começar
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input {...register("email")} placeholder="email@exemplo.com" />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label>Password</Label>
          <Input {...register("password")} type="password" />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label>Confirmar Password</Label>
          <Input {...register("confirmPassword")} type="password" />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar conta"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Já tens conta?{" "}
        <a href="/login" className="underline">
          Entrar
        </a>
      </p>
    </div>
  );
}
