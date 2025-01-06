  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
  } from "../ui/form";
  import { useForm } from "react-hook-form";
  import { loginSchema } from "@/Schema";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import { Input } from "../ui/input";
  import { Button } from "../ui/button";
  import useAuth from "@/hooks/useAuth";
  import { useNavigate } from "react-router-dom";
  import { AuthContext } from "@/contexts/AuthContext";
  import { useContext } from "react";
  import { FirebaseError } from "@firebase/util";

  export default function LoginForm() {
    const { doSignInWithEmailAndPass } = useAuth();
    const navigate = useNavigate();
    const { userLoggedIn } = useContext(AuthContext);
    const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
      try {
        await doSignInWithEmailAndPass(values.email, values.password);

        if (userLoggedIn) navigate("/");
      } catch (e) {
        if (e instanceof FirebaseError) {
          switch (e.code) {
            case "auth/invalid-credential":
          }
        }
      }
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          {/* Username */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-6 bg-blue-700 hover:bg-blue-600 font-semibold text-base"
          >
            Login
          </Button>
        </form>
      </Form>
    );
  }
