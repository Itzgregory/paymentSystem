import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Job, AppliedJob, Interview} from "@/types/jobs/jobTypes";
// import { fetchAppliedJobs } from "@/app/api/job/job";

interface JobSate {
    jobs: Job[];
    appliedJobs: AppliedJob[];
    interviews: Interview[];
    loading: boolean;
    error: string | null;

}

const initialState: JobSate ={
    jobs: [],
    appliedJobs: [],
    interviews: [],
    loading: false,
    error: null,
};

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        fetchJobsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchJobsSuccess: (state, action: PayloadAction<Job[]>) => {
            state.jobs = action.payload;
            state.loading = false;
        },
        fetchJobsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
          
        fetchAppliedJobsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAppliedJobsSuccess: (state, action: PayloadAction<AppliedJob[]>) => {
            state.appliedJobs = action.payload;
            state.loading = false;
        },
        fetchAppliedJobsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
      
        fetchInterviewsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchInterviewsSuccess: (state, action: PayloadAction<Interview[]>) => {
            state.interviews = action.payload;
            state.loading = false;
        },
        fetchInterviewsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
      
export const {
    fetchJobsStart,
    fetchJobsSuccess,
    fetchJobsFailure,
    fetchAppliedJobsStart,
    fetchAppliedJobsSuccess,
    fetchAppliedJobsFailure,
    fetchInterviewsStart,
    fetchInterviewsSuccess,
    fetchInterviewsFailure,
} = jobSlice.actions;

export default jobSlice.reducer;
