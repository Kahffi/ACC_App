import { signUpSchema } from "@/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCred) => {
        console.log(userCred.user);
        alert("loggedin");
      })
      .catch((err) => {
        console.error(err.code);
        console.log(err.message);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
              {/* <FormDescription className="w-3/4">
                Gunakan username yang unik dan mudah diingat
              </FormDescription> */}
            </FormItem>
          )}
        />
        {/* username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
              {/* <FormDescription className="w-3/4">
                Gunakan username yang unik dan mudah diingat
              </FormDescription> */}
            </FormItem>
          )}
        />
        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {/* <FormDescription className="w-3/4">
                Gunakan username yang unik dan mudah diingat
              </FormDescription> */}
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-6 bg-blue-800 font-semibold text-base"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
