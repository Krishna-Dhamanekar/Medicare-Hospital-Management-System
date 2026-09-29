import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./Dashboard.css"

const Icon = ({ children }) => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {children}
    </svg>
)

const PatientsIcon = () => (
    <Icon>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
        <path d="M17 5.5v5M14.5 8h5" />
    </Icon>
)

const DoctorsIcon = () => (
    <Icon>
        <path d="M6 3v6a4 4 0 0 0 8 0V3" />
        <path d="M10 13v2a5 5 0 0 0 10 0v-1" />
        <circle cx="20" cy="12" r="2" />
    </Icon>
)

const AppointmentsIcon = () => (
    <Icon>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Icon>
)

const TodayIcon = () => (
    <Icon>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
    </Icon>
)

const ArrowIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
)

function Dashboard() {

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

    if (error) {
        return (
            <div className="dashboard-main">
                <div className="dashboard-state dashboard-state-error" role="alert">
                    <strong>{error}</strong>
                    <span>Check that the server is running and you are signed in, then refresh the page.</span>
                </div>
            </div>
        )
    }

    if (!dashboard) {
        return (
            <div className="dashboard-main">
                <div className="dashboard-state" role="status">
                    <span className="dashboard-spinner" aria-hidden="true"></span>
                    <strong>Loading dashboard...</strong>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard-main">

            <div className="dashboard-header">

                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Overview of your hospital management system
                    </p>
                </div>

                <div className="admin-badge">
                    <span className="admin-badge-dot"></span>
                    Admin
                </div>

            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card card-patients">
                    <div className="dashboard-card-icon">
                        <PatientsIcon />
                    </div>

                    <div>
                        <h3>Total Patients</h3>
                        <p>{dashboard.totalPatients}</p>
                    </div>
                </div>

                <div className="dashboard-card card-doctors">
                    <div className="dashboard-card-icon">
                        <DoctorsIcon />
                    </div>

                    <div>
                        <h3>Total Doctors</h3>
                        <p>{dashboard.totalDoctors}</p>
                    </div>
                </div>

                <div className="dashboard-card card-appointments">
                    <div className="dashboard-card-icon">
                        <AppointmentsIcon />
                    </div>

                    <div>
                        <h3>Total Appointments</h3>
                        <p>{dashboard.totalAppointments}</p>
                    </div>
                </div>

                <div className="dashboard-card card-today">
                    <div className="dashboard-card-icon">
                        <TodayIcon />
                    </div>

                    <div>
                        <h3>Today's Appointments</h3>
                        <p>{dashboard.todayAppointments}</p>
                    </div>
                </div>

            </div>

            <div className="quick-actions">

                <h2>Quick Actions</h2>

                <div className="quick-action-grid">

                    <Link
                        to="/patients"
                        className="quick-action-card"
                    >
                        <div className="quick-action-icon">
                            <PatientsIcon />
                        </div>
                        <div className="quick-action-text">
                            <strong>Manage Patients</strong>
                            <span>
                                View and manage patients
                            </span>
                        </div>
                        <span className="quick-action-arrow"><ArrowIcon /></span>
                    </Link>

                    <Link
                        to="/doctors"
                        className="quick-action-card"
                    >
                        <div className="quick-action-icon">
                            <DoctorsIcon />
                        </div>
                        <div className="quick-action-text">
                            <strong>Manage Doctors</strong>
                            <span>
                                View and manage doctors
                            </span>
                        </div>
                        <span className="quick-action-arrow"><ArrowIcon /></span>
                    </Link>

                    <Link
                        to="/appointments"
                        className="quick-action-card"
                    >
                        <div className="quick-action-icon">
                            <AppointmentsIcon />
                        </div>
                        <div className="quick-action-text">
                            <strong>Manage Appointments</strong>
                            <span>
                                View and manage appointments
                            </span>
                        </div>
                        <span className="quick-action-arrow"><ArrowIcon /></span>
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Dashboard