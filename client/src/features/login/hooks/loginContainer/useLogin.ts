import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginStart, loginSuccess, loginFailure, logout } from "@/redux/slices/user/authSlice";
import { loginUser } from "@/app/api/user/auth";
import { RootState } from "@/redux/store/store";
import { LoginFormData } from "../../types/logintypes";
import { getAuthToken, isTokenValid, setAuthToken } from "@/utils/auth/authutils";
import { getErrorMessage } from '../../../dashboard/userDashboard/types/api/api';

const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  // const reduxState = useSelector((state: RootState) => state); 
  const [localError, setLocalError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const getRedirectPath = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return '/admindashboard';
      case 'user':
      default:
        return '/talentdashboard';
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    dispatch(loginStart());
    setLocalError(null);

    try {
      const response = await loginUser(data);
      // console.log("[useLogin] Login response:", response);

      setAuthToken(
        response.id,
        response.token,
        response.role || "",
        response.user?.firstName || "",
        response.user?.lastName || "",
        response.user?.email || "",
        3600000
      );

      dispatch(loginSuccess({
        user: response.user,
        token: response.token,
        role: response.role,
        id: response.id,
      }));

      const token = getAuthToken();
      // console.log("[useLogin] Retrieved token:", token);
      // console.log("[useLogin] Token valid:", isTokenValid());
      // console.log("[useLogin] LocalStorage after set:", {
      //   activeUser: localStorage.getItem("activeUser"),
      //   users: localStorage.getItem("users"),
      // });

      if (!token || !isTokenValid()) {
        throw new Error("Token validation failed after setting");
      }

      setIsRedirecting(true);
      setTimeout(() => {
        const redirectPath = getRedirectPath(response.role || 'user');
        // console.log("[useLogin] About to redirect to:", redirectPath);
        // console.log("[useLogin] User role:", response.role);
        // console.log("[useLogin] Final LocalStorage check:", {
        //   activeUser: localStorage.getItem("activeUser"),
        //   users: localStorage.getItem("users"),
        // });
        // console.log("[useLogin] Final Redux state:", reduxState);
        router.push(redirectPath);
      }, 1000); 
    } catch (err) {
      const message = getErrorMessage(err);
      console.error("[useLogin] Login error:", message);
      dispatch(loginFailure(message));
      setLocalError(message);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return {
    loading,
    user,
    localError,
    onSubmit,
    handleLogout,
    isRedirecting,
  };
};

export default useLogin;