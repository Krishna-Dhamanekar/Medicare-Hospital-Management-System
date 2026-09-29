import { Link, useLocation, useNavigate } from "react-router-dom"

function Layout({ children }) {

    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <div className="app-layout">

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <h2>CareHub</h2>
                    <p>Hospital Management</p>
                </div>

                <nav className="sidebar-nav">

                    <Link
                        to="/dashboard"
                        className={
                            location.pathname === "/dashboard"
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/patients"
                        className={
                            location.pathname === "/patients"
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Patients
                    </Link>

                    <Link
                        to="/doctors"
                        className={
                            location.pathname === "/doctors"
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Doctors
                    </Link>

                    <Link
                        to="/appointments"
                        className={
                            location.pathname === "/appointments"
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
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

            <main className="app-content">
                {children}
            </main>

        </div>
    )
}

export default Layout

