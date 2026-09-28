import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Dashboard() {

    const navigate = useNavigate()

    const [dashboard, setDashboard] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const loadDashboard = async () => {

            try {
                const token = localStorage.getItem("token")

                const response = await axios.get(
                    "http://localhost:8082/admin/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setDashboard(response.data)

            } catch {
                setError("Unable to load dashboard data")
            }
        }

        loadDashboard()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!dashboard) {
        return <p>Loading dashboard...</p>
    }

    return (
        <div className="dashboard-layout">

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <h2>CareHub</h2>
                    <p>Hospital Management</p>
                </div>

                <nav className="sidebar-nav">

                    <Link to="/dashboard" className="nav-link active">
                        Dashboard
                    </Link>

                    <Link to="/patients" className="nav-link">
                        Patients
                    </Link>

                    <Link to="/doctors" className="nav-link">
                        Doctors
                    </Link>

                    <Link to="/appointments" className="nav-link">
                        Appointments
                    </Link>

                </nav>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </aside>

            <main className="dashboard-main">

                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome, Admin!</p>
                    </div>
                </div>

                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <h3>Total Patients</h3>
                        <p>{dashboard.totalPatients}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Total Doctors</h3>
                        <p>{dashboard.totalDoctors}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Total Appointments</h3>
                        <p>{dashboard.totalAppointments}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Today's Appointments</h3>
                        <p>{dashboard.todayAppointments}</p>
                    </div>

                </div>

            </main>

        </div>
    )
}

export default Dashboard