import TalentDashboardLayout from "@/app/talentdashboard/layout";
import DashboardHome from "../../features/dashboard/userDashboard/components/Home/dashboardHome";

export default function TalentDashboardHome() {
  return (
    <TalentDashboardLayout>
      <div className="parent-page">
        <DashboardHome />
      </div>
    </TalentDashboardLayout>
  );
}
