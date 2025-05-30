export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    currentRole?: string;
    currentCompany?: string;
    location?: string;
    jobStatus?: 'ready' | 'open' | 'closed';
  }
  
  export type JobStatus = 'ready' | 'open' | 'closed';


