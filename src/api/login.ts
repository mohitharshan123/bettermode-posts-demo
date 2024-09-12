import axiosInstance from ".";

export const signIn = async (credentials: {
  email: string;
  verificationCode: string;
}) => await axiosInstance.post("/auth/signin", credentials);
