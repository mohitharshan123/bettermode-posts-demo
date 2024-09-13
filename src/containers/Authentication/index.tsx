import { useForm } from "react-hook-form";

import Otp from "./Otp";
import Logo from "../../assets/logo.svg";
import GoogleButton from "../../assets/google.svg";
import { JWT_TOKEN, JWT_TOKEN_LS } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useRequestTokenCode } from "../../graphql/user/useAuthentication";
import LoadingSpinner from "../../components/LoadingSpinner";
import Cookies from "universal-cookie";
import { useState } from "react";

type LoginFormValues = {
  email: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [requestTokenCode, { error: responseError }] = useRequestTokenCode();
  const [isTokenRequested, setIsTokenRequested] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const handleLogin = async ({ email }: LoginFormValues) => {
    const { data } = await requestTokenCode({
      variables: { input: { email } },
    });
    if (data?.requestGlobalTokenCode?.status === "succeeded") {
      setIsTokenRequested(true);
    }
  };

  const handleOtpCompleted = async () => {
    const cookies = new Cookies();
    cookies.set(JWT_TOKEN_LS, JWT_TOKEN, { path: "/" });
    navigate("/posts");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <img
        src={Logo}
        alt="logo"
        height={90}
        width={200}
        className="object-fit"
      />
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don't have an account yet?
              <a className="ml-2 cursor-pointer text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500">
                Sign up here
              </a>
            </p>
          </div>
          {!!email && isTokenRequested ? (
            <div className="w-full flex flex-row mt-10 justify-center">
              <Otp onOtpComplete={handleOtpCompleted} />
            </div>
          ) : (
            <div className="mt-5">
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <img
                  src={GoogleButton}
                  alt="google"
                  height={20}
                  width={20}
                  className="object-fit"
                />
                Google
              </button>
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
                Or
              </div>

              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        aria-describedby="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        {...register("email", {
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>
                    {errors.email?.type == "required" && (
                      <span className="text-red-600 text-xs">
                        * This field is required
                      </span>
                    )}
                    {errors.email?.message ? (
                      <span className="text-red-600 text-xs">
                        * Invalid email
                      </span>
                    ) : (
                      responseError?.graphQLErrors.length && (
                        <span className="text-red-600 text-xs">
                          {responseError.graphQLErrors[0].message}
                        </span>
                      )
                    )}
                  </div>

                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ms-3">
                      <label
                        htmlFor="remember-me"
                        className="text-sm dark:text-white"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isSubmitting ? <LoadingSpinner /> : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
