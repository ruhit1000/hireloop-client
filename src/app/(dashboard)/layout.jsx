import DashBoardNavbar from "@/components/Dashboard/DashBoardNavbar";

export const metadata = {
  title: "HireLoop - Dashboard",
  description: "Welcome to your dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-[#0B0B0C] text-white">
      <DashBoardNavbar>
        {children}
      </DashBoardNavbar>
    </div>
  );
}