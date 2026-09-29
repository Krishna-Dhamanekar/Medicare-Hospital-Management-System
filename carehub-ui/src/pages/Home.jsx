import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate()

    return (
        <div className="home-page">

            <header className="home-navbar">

                <div className="home-logo">
                    <h2>CareHub</h2>
                    <span>Hospital & Healthcare</span>
                </div>

                <button
                    className="home-login-button"
                    onClick={() => navigate("/login")}
                >
                    Admin Login
                </button>

            </header>


            <section className="home-hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        🏥 Trusted Healthcare Management
                    </span>

                    <h1>
                        Quality Healthcare,
                        <br />
                        <span>Connected with Care.</span>
                    </h1>

                    <p>
                        CareHub is a modern hospital management system
                        designed to help hospitals manage patients,
                        doctors and appointments efficiently.
                    </p>

                    <button
                        className="hero-login-button"
                        onClick={() => navigate("/login")}
                    >
                        Admin Login →
                    </button>

                </div>


                <div className="hero-card">

                    <div className="hero-card-icon">
                        ❤️
                    </div>

                    <h3>CareHub Medical Center</h3>

                    <p>
                        Comprehensive healthcare management
                        for better patient care.
                    </p>

                    <div className="hero-stats">

                        <div>
                            <strong>24/7</strong>
                            <span>Care Support</span>
                        </div>

                        <div>
                            <strong>100%</strong>
                            <span>Digital Records</span>
                        </div>

                    </div>

                </div>

            </section>


            <section className="home-services">

                <div className="section-heading">

                    <span>OUR SERVICES</span>

                    <h2>
                        Everything your hospital needs
                    </h2>

                    <p>
                        A simple and efficient platform for
                        managing everyday hospital operations.
                    </p>

                </div>


                <div className="service-grid">

                    <div className="service-card">

                        <div className="service-icon">
                            👨‍⚕️
                        </div>

                        <h3>Doctors</h3>

                        <p>
                            Manage doctors, specialists,
                            contact information and departments.
                        </p>

                    </div>


                    <div className="service-card">

                        <div className="service-icon">
                            🧑‍🤝‍🧑
                        </div>

                        <h3>Patients</h3>

                        <p>
                            Maintain organized patient records
                            and essential information.
                        </p>

                    </div>


                    <div className="service-card">

                        <div className="service-icon">
                            📅
                        </div>

                        <h3>Appointments</h3>

                        <p>
                            Schedule and manage appointments
                            between patients and doctors.
                        </p>

                    </div>

                </div>

            </section>


            <section className="home-about">

                <div>

                    <span className="section-label">
                        ABOUT CAREHUB
                    </span>

                    <h2>
                        Technology that supports
                        better healthcare.
                    </h2>

                </div>

                <p>
                    CareHub brings essential hospital operations
                    together in one secure platform. From patient
                    management to doctor scheduling and appointments,
                    everything can be managed from a single system.
                </p>

            </section>


            <footer className="home-footer">

                <div>
                    <strong>CareHub</strong>
                    <span>Hospital Management System</span>
                </div>

                <p>
                    © 2026 CareHub. All rights reserved.
                </p>

            </footer>

        </div>
    )
}

export default Home