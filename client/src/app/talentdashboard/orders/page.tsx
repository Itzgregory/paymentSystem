import ComingSoon from "@/features/comingSoon/comingSoon";
import TalentDashboardLayout from "../layout";


export default function Home() {
    return (
        <TalentDashboardLayout>
            <div className="parent-page">
            <ComingSoon />
            </div>
        </TalentDashboardLayout>
        );
}
