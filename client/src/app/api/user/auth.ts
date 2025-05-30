
import axiosInstance from "@/utils/axios/axiosInstance";
import { capitalizeFirstLetter } from "@/utils/formating/cases";
import { User } from "@/types/user/user.types";
import { RegistrationFormData } from "@/features/register/types/registerationTypes";
import { LoginFormData } from "@/features/login/types/logintypes";

export const registerUser = async (data: RegistrationFormData): Promise<void> => {
  try {
    const response = await axiosInstance.post("/signup", data);
    console.log("Registration API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
};

export const loginUser = async (
  data: LoginFormData
): Promise<{ user: User; token: string; role: string; id: string }> => {
  try {
    const response = await axiosInstance.post("/login", data);
    console.log("API response:", response.data);

    if (!response.data.success) {
      throw new Error(response.data.message || "Login failed");
    }

    const responseData = response.data.data;
    console.log("Extracted user data:", responseData);

    return {
      user: {
        id: responseData.id, // Add required id
        email: responseData.email || '',
        firstName: capitalizeFirstLetter(responseData.firstName || ''),
        lastName: capitalizeFirstLetter(responseData.lastName || ''),
        profilePicture: responseData.profilePicture,
        currentRole: responseData.currentRole,
        currentCompany: responseData.currentCompany,
        location: responseData.location,
        jobStatus: responseData.jobStatus,
      },
      token: responseData.token,
      role: responseData.role,
      id: responseData.id,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const fetchUserDetails = async (userId: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    const data = response.data;

    return {
      id: userId,
      email: data.email || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      profilePicture: data.profilePicture,
      currentRole: data.currentRole,
      currentCompany: data.currentCompany,
      location: data.location,
      jobStatus: data.jobStatus,
    };
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<void> => {
  try {
    await axiosInstance.patch(`/user/${userId}`, updates);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await axiosInstance.post("/logout");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};