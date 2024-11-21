import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Card } from "../ui/card";
import { heroBg } from "@/assets";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import { DotLoader } from "react-spinners";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");
      navigate("/chat-box");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      reset();
      console.log("Form data:", data);
    }
  };

  return (
    <div>
      <Toaster richColors position="bottom-right" />
      <Card className="flex mx-3 md:mx-10 gap-10 border-none shadow-lg shadow-[#6d28d9]">
        <div className="hidden lg:block max-w-[50%] max-h-[100%] h-full w-full">
          <img
            src={heroBg}
            className="object-fill rounded-tl-lg rounded-bl-lg h-[450px]"
            alt="hero-background"
          />
        </div>

        <div className="max-w-[90%] w-full mx-auto py-5 lg:mx-0 lg:py-10 lg:pr-10">
          <h1 className="scroll-m-20 pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0">
            Login to your account
          </h1>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your Email"
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 text-muted-foreground">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter a strong password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600 text-muted-foreground">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <DotLoader color="#ffffff" size={16} /> Login in progress...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <h1>
              <span className="text-muted-foreground">
                Don&apos;t have an account?
              </span>{" "}
              <Link to="/signup" className="underline">
                Sign Up
              </Link>
            </h1>
          </form>
        </div>
        {/* <Button onClick={() => toast.success("Test Toast")}>Test Toast</Button> */}
      </Card>
    </div>
  );
};

export default Login;
