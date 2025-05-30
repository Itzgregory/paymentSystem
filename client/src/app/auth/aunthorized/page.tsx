import Unauthorized from "@/features/auntorized/authorized";


export default function Home() {
    return (
        <div className="parent-page">
            <Unauthorized />
        </div>
    );
}
