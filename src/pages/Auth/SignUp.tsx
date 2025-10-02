import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { signUpSchema, type SignUpFormData } from "../../utils/validation";
import FormInputAuth from "./FormInputAuth";
import { authBanner } from "../../assets/images";
import routes from "../../config/routes";
import Button from "../../components/Button/Button";
import authApi from "../../services/authApi";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await authApi.register(data);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    }
  };

  const handleGoogleSignUp = () => {
    alert("Google signup feature coming soon!");
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

      {/* Right side - SignUp Form */}
      <div className="w-full lg:w-[44%] flex items-center justify-center py-12">
        <div className="w-full max-w-[370px]">
          <div className="mb-[42px]">
            <h1 className="text-[36px] font-medium text-black mb-2">
              Create an account
            </h1>
            <p className="text-[16px] text-black">Enter your details below</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputAuth
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName}
              type="text"
              autoComplete="given-name"
            />

            <FormInputAuth
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName}
              type="text"
              autoComplete="family-name"
            />

            <FormInputAuth
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              type="email"
              autoComplete="email"
            />

            <FormInputAuth
              label="Password"
              name="password"
              register={register}
              error={errors.password}
              type="password"
              autoComplete="new-password"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="w-full mb-5"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

            <Button
              type="button"
              onClick={handleGoogleSignUp}
              variant="outline"
              className="w-full mb-[34px] flex items-center justify-center gap-[16px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <g clipPath="url(#clip0_195_976)">
                  <path
                    d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_195_976">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Sign up with Google
            </Button>
          </form>
          <div className="text-center">
            <span className="text-[16px] text-black/70">
              Already have account?{" "}
            </span>
            <Link
              to={routes.login}
              className="text-gray-900 hover:text-gray-700 font-medium border-b border-gray-900/50"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
