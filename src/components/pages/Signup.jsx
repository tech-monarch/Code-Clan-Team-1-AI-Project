import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import Login from "./Login";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try{
      const {email, password} = data;
      await createUserWithEmailAndPassword(auth, email, password)
      alert(`${data.email} account created successfully`)

    } catch (error) {
      alert(error.message)
    }
    reset()
    console.log('Form data:', data);
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="name"
            id="fullName"
            placeholder="Enter your Fullname"
            {...register("name", {
              required: "Fullname is required",
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
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

        <Button type="submit">Create Account</Button>
        <h1>Have an account? <Link to='/login'>Login</Link></h1>
      </form>
    </div>
  );
};

export default Signup;
