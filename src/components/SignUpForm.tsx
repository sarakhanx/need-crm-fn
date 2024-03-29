"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {z} from "zod"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Maxwidth from "./MaxWidth";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Asterisk, View } from "lucide-react";
import React from "react";

const api = process.env.NEXT_PUBLIC_API;
const schema = z
  .object({
    email: z
      .string({
        required_error: "Please enter your email",
        invalid_type_error: "Please enter your email",
      })
      .min(1, {
        message: "Please enter your email",
      })
      .email({
        message: "Please enter a valid email",
      }),
    password: z
      .string({
        required_error: "Please enter your password",
        invalid_type_error: "Please enter your password",
      })
      .min(1, {
        message: "Please enter your password",
      })
      .min(6, {
        message: "Password must have at least 6 characters",
      }),
    passwordConfirm: z
      .string({
        required_error: "Please enter your password",
        invalid_type_error: "Please enter your re-password",
      })
      .min(1, {
        message: "Please enter your re-password",
      })
      .min(6, {
        message: "Password must have at least 6 characters",
      }),
    username: z
      .string({
        required_error: "Please enter your username",
        invalid_type_error: "Please enter your username",
      })
      .min(6, {
        message: "Username must have at least 6 characters",
      }),
    name: z
      .string({
        required_error: "Please enter your name",
        invalid_type_error: "Please enter your name",
      })
      .min(3, {
        message: "Name must have at least 3 characters",
      }),
    lastname: z
      .string({
        required_error: "Please enter your lastname",
        invalid_type_error: "Please enter your lastname",
      })
      .min(3, {
        message: "Lastname must have at least 3 characters",
      }),
    telephone: z
      .string({
        required_error: "Please enter your telephone number",
        invalid_type_error: "Please enter telephone in number",
      })
      .min(10, {
        message: "Telephone must have at least 10 characters",
      }),
    roles: z.enum(["seller", "admin"], {
      required_error: "Please select your roles",
      invalid_type_error: "Please select your roles",
    }),
    address: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Password does not match",
      path: ["passwordConfirm"],
    }
  );
type FormFields = z.infer<typeof schema>;

const SignUpForm = () => {
  const [visible, setVisible] = React.useState(false);
  const [formError , setFormError]  = React.useState<any>(null)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: "",
      roles: "seller",
    },
  });
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
        console.log(values)
        const postSignUp = await fetch(`${api}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        if(!postSignUp.ok){
            setFormError("Can not POST in API, Please contact developer")
        }
        form.reset()
        
    } catch (error) {
        setFormError('Something went wrong. Please try again.');
        throw new Error("Something went wrong")
    }
  };

  return (
    <Maxwidth>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username
                <FormControl>
                  <Input placeholder="Username" type="text" {...field} />
                </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password
                <FormControl>
                  <div style={{ position: "relative" }}>
                    <Input
                      placeholder="Password"
                      style={{ paddingRight: "40px" }}
                      type={visible ? "text" : "password"}
                      {...field}
                    />
                    <span
                      onClick={() => setVisible(!visible)}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "0",
                        right: "0",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        paddingRight: "8px",
                      }}
                    >
                      {visible ? (
                        <Asterisk
                          size={40}
                          className="bg-gray-700 rounded-md"
                        />
                      ) : (
                        <Asterisk size={40} className="text-gray-700" />
                      )}
                    </span>
                  </div>
                </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password
                <FormControl>
                  <div style={{ position: "relative" }}>
                    <Input
                      placeholder="Password"
                      style={{ paddingRight: "40px" }}
                      type={visible ? "text" : "password"}
                      {...field}
                    />
                    <span
                      onClick={() => setVisible(!visible)}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "0",
                        right: "0",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        paddingRight: "8px", // Adjust as needed to add space between input and icon
                      }}
                    >
                      {visible ? (
                        <Asterisk
                          size={40}
                          className="bg-gray-700 rounded-md"
                        />
                      ) : (
                        <Asterisk size={40} className="text-gray-700" />
                      )}
                    </span>
                  </div>
                </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center gap-x-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name
                  <FormControl className="w-full">
                    <Input placeholder="Name" type="text" {...field} />
                  </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name
                  <FormControl>
                    <Input placeholder="Lastname" type="text" {...field} />
                  </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roles
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seller">Seller</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>EMAIL
                <FormControl>
                  <Input placeholder="email@example" type="email" {...field} />
                </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address
                <FormControl>
                  <Input placeholder="address" type="text" {...field} />
                </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-700 w-full">
            Sign Up
          </Button>
          {formError && <p className="text-red-500">{formError}</p>}
        </form>
      </Form>
    </Maxwidth>
  );
};
export default SignUpForm;
