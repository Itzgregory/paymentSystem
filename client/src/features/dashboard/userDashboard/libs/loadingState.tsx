
export const LoadingState = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-lg">Loading your dashboard...</p>
      </div>
    </div>
  );
  
  export const ErrorState = ({ error }: { error: string }) => (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-lg text-red-600">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-[#6b4423] text-white rounded hover:bg-[#54361a] transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );


  