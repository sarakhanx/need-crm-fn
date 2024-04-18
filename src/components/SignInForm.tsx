"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {z} from "zod"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Maxwidth from "./MaxWidth";
import { AlertCircle, Asterisk } from "lucide-react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useUserSession } from "@/lib/hooks/authHooks/useUserSession";

const api = process.env.NEXT_PUBLIC_API;
const schema = z
  .object({

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
 
    username: z
      .string({
        required_error: "Please enter your username",
        invalid_type_error: "Please enter your username",
      })
      .min(6, {
        message: "Username must have at least 6 characters",
      }),
  })
type FormFields = z.infer<typeof schema>;
const SignInForm = ({onSuccess}:any) => {
  const {setUserSessionData} = useUserSession()
  const [visible, setVisible] = React.useState(false);
  const [formError , setFormError]  = React.useState<any>(null)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
        console.log(values)
        const postSignIn = await fetch(`${api}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        if(!postSignIn.ok){
          const data = await postSignIn.json()
            setFormError(data.message)
            return;
        }
        const data = await postSignIn.json()
        console.log(data)
        const token = await data.token
        // const userSession = JSON.stringify({...data.userData , token})
        // sessionStorage.setItem("session", userSession)
        const sessionProvider = {...data.userData , token}
        setUserSessionData(sessionProvider)
        onSuccess()
    } catch (error) {
        setFormError('Something went wrong. Please try again.');
        throw new Error("Something went wrong")
    }
  };

  React.useEffect(()=>{
    //! handler error and out
    let timeOut: NodeJS.Timeout | null = null
    if(formError){
      timeOut = setTimeout(()=>{
        setFormError(null)
      }, 3000)
    }
    return ()=>{
      if(timeOut){
        clearTimeout(timeOut)
      }
    }
  },[formError])
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
          <Button type="submit" className="bg-blue-700 hover:bg-blue-400 w-full">
            Sign In
          </Button>
          {formError && (<Alert variant="destructive">
            <AlertCircle  size={16} />
            <AlertTitle>
              <h5>
            บางสิ่งบางอย่างผิดพลาด !!
              </h5>
            </AlertTitle>
            <AlertDescription>
            <p>{formError}</p>
            </AlertDescription>
          </Alert>)}
        </form>
      </Form>
    </Maxwidth>
  );
};
export default SignInForm;
