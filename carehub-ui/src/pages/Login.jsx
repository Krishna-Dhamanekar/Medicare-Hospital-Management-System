import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (event) => {

        event.preventDefault()

        try {

            const response = await axios.post(
                "http://localhost:8082/auth/login",
                {
                    username: username,
                    password: password
                }
            )

            localStorage.setItem(
                "token",
                response.data.token
            )

            navigate("/dashboard")

        } catch {

            setError("Invalid username or password")
        }
    }

    return (

        <div className="login-page">

            <div className="login-card">

                <button
                    className="back-home-button"
                    onClick={() => navigate("/")}
                >
                    ← Back to Home
                </button>


                <div className="login-header">

                    <div className="login-logo">
                        🏥
                    </div>

                    <h1>CareHub</h1>

                    <p>
                        Hospital Management System
                    </p>

                </div>


                <div className="login-welcome">

                    <h2>Welcome Back</h2>

                    <p>
                        Sign in to access the CareHub
                        administration portal.
                    </p>

                </div>


                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                    </div>


                    {error && (

                        <p className="error-message">
                            {error}
                        </p>

                    )}


                    <button
                        type="submit"
                        className="login-button"
                    >
                        Sign In
                    </button>

                </form>


                <div className="login-footer">

                    <span>
                        🔒 Secure Admin Access
                    </span>

                </div>

            </div>

        </div>
    )
}

export default Login

