"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card } from "@/components/ui/";
import { z } from "zod"; 
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 

// Define schema Zod para validacion
const schema = z.object({
  username: z.string().min(4, { message: "Por favor, ingresa tu nombre de usuario." }),
  password: z.string().min(4, { message: "Por favor, ingresa tu contraseña." }),
});

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  // Usando react-hook-form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Usando zodResolver para schema validacion
  });

  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { username, password } = data; 

    setError(null); 

    // Simulando una llamada a la api
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-96 p-8">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>} 

        <form onSubmit={handleSubmit(onSubmit)}> 
          <div className="mb-4">
            <Input
              placeholder="Nombre de usuario"
              {...register("username")} 
            />
            {errors.username && (
              <p className="text-red-500">{(errors.username.message as string) || 'Error en el nombre de usuario'}</p>
            )} 
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Contraseña"
              {...register("password")} 
            />
            {errors.password && (
              <p className="text-red-500">{(errors.password.message as string) || 'Error en la contraseña'}</p>
            )} 
          </div>
          <Button type="submit">Iniciar Sesión</Button> 
        </form>
      </Card>
    </div>
  );
}
