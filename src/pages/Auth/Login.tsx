import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormData } from "../../utils/validation";
import { handleApiError } from "../../utils/errorHandler";
import { authBanner } from "../../assets/images";
import routes from "../../config/routes";
import FormInputAuth from "./FormInputAuth";
import Button from "@/components/Button/";
import authApi from "../../services/authApi";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };

      await authApi.login(loginData);
      toast.success("Login successful!");
      
      navigate("/");
    } catch (error: unknown) {
      const errorMessage = handleApiError(error, "Login failed. Please try again.");
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex mt-[60px] mb-[130px]">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-[56%]">
        <img
          src={authBanner}
          alt="Shopping illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-[44%] flex items-center justify-center py-12">
        <div className="w-full max-w-[370px]">
          <div className="mb-[42px]">
            <h1 className="text-[36px] font-medium text-black mb-2">
              Log in to Exclusive
            </h1>
            <p className="text-[16px] text-black">Enter your details below</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputAuth
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              type="text"
              autoComplete="email"
            />

            <FormInputAuth
              label="Password"
              name="password"
              register={register}
              error={errors.password}
              type="password"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between mb-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="w-[134px]"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>

              <Link
                to="#"
                className="text-primary hover:text-red-600 text-[16px]"
              >
                Forget Password?
              </Link>
            </div>

            <div className="text-center">
              <span className="text-[16px] text-gray-600">
                Don't have an account?{" "}
              </span>
              <Link
                to={routes.signUp}
                className="text-primary hover:text-red-600 font-medium border-b border-red-500/50"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
