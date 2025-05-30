export interface RegistrationFormData {
    email: string;
    firstName: string;
    lastName: string;
    otherName?: string;
    password: string;
    confirmPassword: string;
    termsAccepted?: boolean;
  }