import TalentDashboardLayout from "@/app/talentdashboard/layout";
import AdminDashboard from "@/features/dashboard/adminDasboard/components/AdminDasboardHome";
import AdminProtectedRoute from "@/utils/middlewares/adminRoute/protectAdminRoute";

export default function TalentDashboardHome() {
  return (
    <AdminProtectedRoute>
      <TalentDashboardLayout>
        <div className="parent-page">
          <AdminDashboard />
        </div>
      </TalentDashboardLayout>
    </AdminProtectedRoute>
  );
}
