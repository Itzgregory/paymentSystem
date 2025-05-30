import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserDetails } from '@/app/api/user/auth';
import { getUserDetails } from '@/utils/auth/authutils';
import { User } from '@/types/user/user.types';

interface ProfileError {
  error: string;
  fallbackData?: User;
}

interface ProfileState extends User {
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

const initialState: ProfileState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  profilePicture: '',
  currentRole: '',
  currentCompany: '',
  location: '',
  jobStatus: undefined,
  loading: false,
  error: null,
  lastUpdated: null,
};

export const loadProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: ProfileError }
>(
  'profile/loadProfile',
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No user ID found');
      const profileData = await fetchUserDetails(userId);
      const authData = getUserDetails();
      const completeProfile: User = {
        id: userId,
        email: authData?.email || profileData.email || '',
        firstName: authData?.firstName || profileData.firstName || '',
        lastName: authData?.lastName || profileData.lastName || '',
        profilePicture: profileData.profilePicture,
        currentRole: profileData.currentRole,
        currentCompany: profileData.currentCompany,
        location: profileData.location,
        jobStatus: profileData.jobStatus,
      };
      localStorage.setItem('userProfile', JSON.stringify({
        data: completeProfile,
        lastUpdated: Date.now(),
      }));
      return completeProfile;
    } catch (error: any) {
      const cached = localStorage.getItem('userProfile');
      if (cached) {
        const { data } = JSON.parse(cached);
        return rejectWithValue({ 
          error: error.message || 'Unknown error', 
          fallbackData: data,
        });
      }
      return rejectWithValue({ error: error.message || 'Unknown error' });
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      const payload = action.payload;
      if (payload) {
        state.email = payload.email ?? state.email;
        state.firstName = payload.firstName ?? state.firstName;
        state.lastName = payload.lastName ?? state.lastName;
        state.profilePicture = payload.profilePicture ?? state.profilePicture;
        state.currentRole = payload.currentRole ?? state.currentRole;
        state.currentCompany = payload.currentCompany ?? state.currentCompany;
        state.location = payload.location ?? state.location;
        state.jobStatus = payload.jobStatus ?? state.jobStatus;
        state.lastUpdated = Date.now();
        localStorage.setItem('userProfile', JSON.stringify({
          data: {
            id: state.id,
            email: state.email,
            firstName: state.firstName,
            lastName: state.lastName,
            profilePicture: state.profilePicture,
            currentRole: state.currentRole,
            currentCompany: state.currentCompany,
            location: state.location,
            jobStatus: state.jobStatus,
          },
          lastUpdated: state.lastUpdated,
        }));
      }
    },
    clearProfile(state) {
      state.id = '';
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.profilePicture = undefined;
      state.currentRole = undefined;
      state.currentCompany = undefined;
      state.location = undefined;
      state.jobStatus = undefined;
      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
      localStorage.removeItem('userProfile');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.profilePicture = action.payload.profilePicture;
        state.currentRole = action.payload.currentRole;
        state.currentCompany = action.payload.currentCompany;
        state.location = action.payload.location;
        state.jobStatus = action.payload.jobStatus;
        state.lastUpdated = Date.now();
        state.error = null;
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          if (action.payload.fallbackData) {
            state.id = action.payload.fallbackData.id;
            state.email = action.payload.fallbackData.email;
            state.firstName = action.payload.fallbackData.firstName;
            state.lastName = action.payload.fallbackData.lastName;
            state.profilePicture = action.payload.fallbackData.profilePicture;
            state.currentRole = action.payload.fallbackData.currentRole;
            state.currentCompany = action.payload.fallbackData.currentCompany;
            state.location = action.payload.fallbackData.location;
            state.jobStatus = action.payload.fallbackData.jobStatus;
            state.error = `Using cached data: ${action.payload.error}`;
          } else {
            state.error = action.payload.error;
          }
        } else {
          state.error = 'Unknown error occurred';
        }
      });
  },
});

export const { updateProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;