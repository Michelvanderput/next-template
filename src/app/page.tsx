"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Voer een geldig emailadres in"),
  name: z.string().min(2, "Minimaal 2 tekens"),
});

type FormValues = z.infer<typeof schema>;

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", name: "" },
  });

  async function onSubmit(values: FormValues) {
    // demo: normaal post je naar /api/...
    await new Promise((r) => setTimeout(r, 400));
    console.log(values);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Kickstart template</CardTitle>
          <CardDescription>Next.js + TS + Tailwind + shadcn/ui + Zod + RHF</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="name">Naam</Label>
              <Input id="name" placeholder="Jan" {...register("name")} />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="jan@voorbeeld.nl" {...register("email")} />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Bezig..." : "Verstuur"}
            </Button>

            {isSubmitSuccessful && (
              <p className="text-sm text-green-700">Gelukt! Check je console (demo).</p>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
