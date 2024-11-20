import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      alert(`Welcome back ${data.email}`);
    } catch (error) {
      alert(error.message);
    }
    reset();
    console.log("Form data:", data);
  };

  return (
    <div>
      <h1>Login to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && <p>{errors.email.message}</p>}
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
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <Button type="submit">Login</Button>
        <h1>Have an account? <Link to='/signup'>Sign Up</Link></h1>
      </form>
    </div>
  );
};

export default Login;
