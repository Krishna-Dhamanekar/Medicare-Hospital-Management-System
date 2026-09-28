import { useEffect, useState } from "react"
import axios from "axios"

function Patients() {

    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        age: ""
    })

    const loadPatients = async () => {

        try {
            const token = localStorage.getItem("token")

            const response = await axios.get(
                "http://localhost:8082/patients",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setPatients(response.data.content)

        } catch {
            setError("Unable to load patients")
        }
    }

    useEffect(() => {
        const load = async () => {
            await loadPatients()
        }

        load()
    }, [])

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const openAddForm = () => {
        setEditingId(null)

        setForm({
            name: "",
            email: "",
            phone: "",
            age: ""
        })

        setError("")
        setSuccess("")
        setShowForm(true)
    }

    const openEditForm = (patient) => {
        setEditingId(patient.id)

        setForm({
            name: patient.name,
            email: patient.email,
            phone: patient.phone,
            age: patient.age
        })

        setError("")
        setSuccess("")
        setShowForm(true)
    }

    const handleSubmit = async (event) => {

        event.preventDefault()

        try {
            const token = localStorage.getItem("token")

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const patientData = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                age: Number(form.age)
            }

            if (editingId) {

                await axios.put(
                    `http://localhost:8082/patients/${editingId}`,
                    patientData,
                    config
                )

                setSuccess("Patient updated successfully")

            } else {

                await axios.post(
                    "http://localhost:8082/patients",
                    patientData,
                    config
                )

                setSuccess("Patient added successfully")
            }

            setForm({
                name: "",
                email: "",
                phone: "",
                age: ""
            })

            setEditingId(null)
            setShowForm(false)

            await loadPatients()

        } catch (error) {

            if (error.response?.data?.message) {
                setError(error.response.data.message)
            } else {
                setError("Unable to save patient")
            }
        }
    }

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this patient?"
        )

        if (!confirmed) {
            return
        }

        try {
            const token = localStorage.getItem("token")

            await axios.delete(
                `http://localhost:8082/patients/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setSuccess("Patient deleted successfully")
            setError("")

            await loadPatients()

        } catch {
            setError("Unable to delete patient")
        }
    }

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="patients-page">

            <div className="patients-header">

                <div>
                    <h1>Patients</h1>
                    <p>Manage hospital patients</p>
                </div>

                <button
                    className="add-patient-button"
                    onClick={openAddForm}
                >
                    + Add Patient
                </button>

            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {success && (
                <p className="success-message">
                    {success}
                </p>
            )}

            <div className="patients-toolbar">

                <input
                    type="text"
                    placeholder="Search patients by name..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

            </div>

            {showForm && (
                <div className="patient-form-card">

                    <h2>
                        {editingId ? "Edit Patient" : "Add Patient"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="patient-form-grid">

                            <div className="form-group">
                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter patient name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Age</label>

                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Enter age"
                                    value={form.age}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                />
                            </div>

                        </div>

                        <div className="patient-form-actions">

                            <button
                                type="submit"
                                className="save-button"
                            >
                                {editingId ? "Update Patient" : "Save Patient"}
                            </button>

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}

            <div className="patients-table">

                <table>

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>

                    {filteredPatients.length === 0 ? (

                        <tr>
                            <td colSpan="6">
                                No patients found
                            </td>
                        </tr>

                    ) : (

                        filteredPatients.map((patient) => (

                            <tr key={patient.id}>

                                <td>{patient.id}</td>

                                <td>{patient.name}</td>

                                <td>{patient.email}</td>

                                <td>{patient.phone}</td>

                                <td>{patient.age}</td>

                                <td>

                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            openEditForm(patient)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(patient.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    )}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Patients