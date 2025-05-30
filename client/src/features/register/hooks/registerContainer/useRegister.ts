import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
import {
  registrationStart,
  registrationSuccess,
  registrationFailure,
} from "@/redux/slices/user/authSlice";
import { registerUser } from "@/app/api/user/auth";
import { RootState } from "@/redux/store/store";
import { RegistrationFormData } from "../../types/registerationTypes";
import { getErrorMessage } from "../../../dashboard/userDashboard/types/api/api";

type UseRegistrationProps = {
  onSuccess?: () => void;
};

const useRegistration = ({ onSuccess }: UseRegistrationProps = {}) => {
  const dispatch = useDispatch();
  // const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async (data: RegistrationFormData) => {
    if (data.password !== data.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    dispatch(registrationStart());
    setLocalError(null);

    try {
      const response = await registerUser(data);
      console.log("Registration response:", response);

      dispatch(registrationSuccess());

      if (onSuccess) onSuccess(); 

      // Optionally delay redirect until user clicks in modal
      // router.push("/login");
    } catch (err) {
      const message = getErrorMessage(err);
      console.error("Registration error:", message);
      dispatch(registrationFailure(message));
      setLocalError(message);
    }
  };

  return {
    loading,
    localError: localError || error,
    onSubmit,
  };
};

export default useRegistration;
