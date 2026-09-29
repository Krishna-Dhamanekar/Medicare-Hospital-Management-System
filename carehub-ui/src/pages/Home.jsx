import { useNavigate } from "react-router-dom"

/* Small inline icons (no extra packages needed) */
const Icon = ({ children }) => (
    <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
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

const icons = {
    heart: (
        <Icon>
            <path d="M19.5 12.6 12 20l-7.5-7.4a4.9 4.9 0 0 1 0-7 5 5 0 0 1 7 0l.5.5.5-.5a5 5 0 0 1 7 0 4.9 4.9 0 0 1 0 7Z" />
            <path d="M7 12h2.5l1.5-2.5 2 5 1.5-2.5H17" />
        </Icon>
    ),
    doctor: (
        <Icon>
            <circle cx="12" cy="7.5" r="3.5" />
            <path d="M5 20v-1.5A5.5 5.5 0 0 1 10.5 13h3a5.5 5.5 0 0 1 5.5 5.5V20" />
            <path d="M12 15.5v3M10.5 17h3" />
        </Icon>
    ),
    patient: (
        <Icon>
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20v-1a5.5 5.5 0 0 1 5.5-5.5h2a5.5 5.5 0 0 1 5.5 5.5v1" />
            <path d="M17 9.5a3 3 0 0 1 0 5.5M21.5 20v-1a5.5 5.5 0 0 0-3.5-5.1" />
        </Icon>
    ),
    calendar: (
        <Icon>
            <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
            <path d="M3.5 10h17M8 3v4M16 3v4M8 14.5h3" />
        </Icon>
    ),
    dashboard: (
        <Icon>
            <rect x="3.5" y="3.5" width="7" height="9" rx="1.8" />
            <rect x="13.5" y="3.5" width="7" height="5" rx="1.8" />
            <rect x="13.5" y="11.5" width="7" height="9" rx="1.8" />
            <rect x="3.5" y="15.5" width="7" height="5" rx="1.8" />
        </Icon>
    ),
    search: (
        <Icon>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4.2-4.2" />
        </Icon>
    ),
    shield: (
        <Icon>
            <path d="M12 3 5 5.8v5.6c0 4.4 2.9 8 7 9.6 4.1-1.6 7-5.2 7-9.6V5.8L12 3Z" />
            <path d="m9 12 2.2 2.2L15.5 10" />
        </Icon>
    ),
    check: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
             strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
    ),
}

const services = [
    {
        icon: icons.doctor,
        title: "Doctors",
        text: "Manage doctors and specialists with their departments, contact details and availability in one directory.",
    },
    {
        icon: icons.patient,
        title: "Patients",
        text: "Maintain organized patient records with essential information that is easy to add, update and search.",
    },
    {
        icon: icons.calendar,
        title: "Appointments",
        text: "Schedule and manage appointments between patients and doctors, including the reason for each visit.",
    },
    {
        icon: icons.dashboard,
        title: "Admin dashboard",
        text: "See total patients, doctors and appointments at a glance and jump straight to common tasks.",
    },
    {
        icon: icons.search,
        title: "Quick search",
        text: "Find any patient, doctor or appointment in seconds instead of scrolling through long lists.",
    },
    {
        icon: icons.shield,
        title: "Secure admin access",
        text: "Hospital data stays behind an administrator login so only authorised staff can make changes.",
    },
]

const steps = [
    {
        title: "Sign in as admin",
        text: "Log in securely to reach the hospital control panel.",
    },
    {
        title: "Manage your records",
        text: "Add and update doctors and patients from their own pages.",
    },
    {
        title: "Schedule appointments",
        text: "Match patients with doctors and keep every visit organised.",
    },
]

const highlights = [
    "Doctors, patients and appointments in one place",
    "Simple forms for adding and editing records",
    "Instant search across every record list",
    "Clean dashboard with live totals",
]

function Home() {

    const navigate = useNavigate()

    return (
        <div className="home-page">

            <header className="home-navbar">

                <div className="home-logo">
                    <h2>CareHub</h2>
                    <span>Hospital & Healthcare</span>
                </div>

                <nav className="home-nav-links" aria-label="Main">
                    <a href="#services">Services</a>
                    <a href="#how-it-works">How it works</a>
                    <a href="#about">About</a>
                </nav>

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
                        <i className="hero-tag-dot" />
                        Trusted Healthcare Management
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

                    <div className="hero-actions">

                        <button
                            className="hero-login-button"
                            onClick={() => navigate("/login")}
                        >
                            Admin Login →
                        </button>

                        <a className="hero-secondary-link" href="#services">
                            Explore services
                        </a>

                    </div>

                    <ul className="hero-trust">
                        <li>{icons.check} Secure admin access</li>
                        <li>{icons.check} Digital records</li>
                        <li>{icons.check} Works on any device</li>
                    </ul>

                </div>


                <div className="hero-card">

                    <div className="hero-card-icon">
                        {icons.heart}
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


            <section className="home-metrics" aria-label="Platform overview">

                <div className="metric">
                    <strong>3</strong>
                    <span>Core modules</span>
                </div>

                <div className="metric">
                    <strong>1</strong>
                    <span>Unified platform</span>
                </div>

                <div className="metric">
                    <strong>24/7</strong>
                    <span>Access to records</span>
                </div>

                <div className="metric">
                    <strong>100%</strong>
                    <span>Paperless workflow</span>
                </div>

            </section>


            <section className="home-services" id="services">

                <div className="section-heading">

                    <span>Our services</span>

                    <h2>
                        Everything your hospital needs
                    </h2>

                    <p>
                        A simple and efficient platform for
                        managing everyday hospital operations.
                    </p>

                </div>


                <div className="service-grid">

                    {services.map((service) => (
                        <div className="service-card" key={service.title}>

                            <div className="service-icon">
                                {service.icon}
                            </div>

                            <h3>{service.title}</h3>

                            <p>{service.text}</p>

                        </div>
                    ))}

                </div>

            </section>


            <section className="home-process" id="how-it-works">

                <div className="section-heading">

                    <span>How it works</span>

                    <h2>
                        Up and running in three steps
                    </h2>

                    <p>
                        From login to scheduling, the workflow
                        is designed to stay out of your way.
                    </p>

                </div>


                <div className="process-grid">

                    {steps.map((step, index) => (
                        <div className="process-step" key={step.title}>

                            <div className="process-number">
                                {index + 1}
                            </div>

                            <h3>{step.title}</h3>

                            <p>{step.text}</p>

                        </div>
                    ))}

                </div>

            </section>


            <section className="home-about" id="about">

                <div>

                    <span className="section-label">
                        About CareHub
                    </span>

                    <h2>
                        Technology that supports
                        better healthcare.
                    </h2>

                </div>

                <div className="about-body">

                    <p>
                        CareHub brings essential hospital operations
                        together in one secure platform. From patient
                        management to doctor scheduling and appointments,
                        everything can be managed from a single system.
                    </p>

                    <ul className="about-list">
                        {highlights.map((item) => (
                            <li key={item}>
                                <span className="about-check">{icons.check}</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                </div>

            </section>


            <section className="home-cta">

                <div className="home-cta-inner">

                    <div>
                        <h2>Ready to manage your hospital with CareHub?</h2>
                        <p>Sign in to open your dashboard and start managing records.</p>
                    </div>

                    <button
                        className="home-cta-button"
                        onClick={() => navigate("/login")}
                    >
                        Admin Login →
                    </button>

                </div>

            </section>


            <footer className="home-footer">

                <div className="footer-top">

                    <div className="footer-brand">
                        <strong>CareHub</strong>
                        <span>Hospital Management System</span>
                        <p>
                            One secure platform for doctors,
                            patients and appointments.
                        </p>
                    </div>

                    <nav className="footer-links" aria-label="Footer">
                        <h4>Platform</h4>
                        <a href="#services">Services</a>
                        <a href="#how-it-works">How it works</a>
                        <a href="#about">About</a>
                    </nav>

                    <div className="footer-links">
                        <h4>Access</h4>
                        <button
                            className="footer-link-button"
                            onClick={() => navigate("/login")}
                        >
                            Admin Login
                        </button>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>
                        © 2026 CareHub. All rights reserved.
                    </p>
                </div>

            </footer>

        </div>
    )
}

export default Home