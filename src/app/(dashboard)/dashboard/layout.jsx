export const metadata = {
    title: "HireLoop - Dashboard",
    description: "Welcome to your dashboard",
}

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            {children}
        </div>
    )
}