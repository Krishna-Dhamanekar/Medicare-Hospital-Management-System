import { useEffect, useState } from "react"
import axios from "axios"

function Doctors() {

    const [doctors, setDoctors] = useState([])

    const [search, setSearch] = useState("")

    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [form, setForm] = useState({
        name: "",
        specialization: "",
        email: "",
        phone: ""
    })

    const loadDoctors = async () => {

        try {

            const token = localStorage.getItem("token")

            const response = await axios.get(
                "http://localhost:8082/doctors",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setDoctors(response.data)

        } catch {

            setError("Unable to load doctors")
        }
    }

    useEffect(() => {

        const load = async () => {
            await loadDoctors()
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
            specialization: "",
            email: "",
            phone: ""
        })

        setError("")
        setSuccess("")
        setShowForm(true)
    }

    const openEditForm = (doctor) => {

        setEditingId(doctor.id)

        setForm({
            name: doctor.name,
            specialization: doctor.specialization,
            email: doctor.email,
            phone: doctor.phone
        })

        setError("")
        setSuccess("")
        setShowForm(true)
    }

    const closeForm = () => {

        setShowForm(false)
        setEditingId(null)

        setForm({
            name: "",
            specialization: "",
            email: "",
            phone: ""
        })

        setError("")
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

            const doctorData = {
                name: form.name,
                specialization: form.specialization,
                email: form.email,
                phone: form.phone
            }

            if (editingId) {

                await axios.put(
                    `http://localhost:8082/doctors/${editingId}`,
    doctorData,
        config
)

setSuccess("Doctor updated successfully")

} else {

    await axios.post(
        "http://localhost:8082/doctors",
        doctorData,
        config
    )

    setSuccess("Doctor added successfully")
}

setForm({
    name: "",
    specialization: "",
    email: "",
    phone: ""
})

setEditingId(null)
setShowForm(false)

await loadDoctors()

} catch (error) {

    if (error.response?.data?.message) {
        setError(error.response.data.message)
    } else {
        setError("Unable to save doctor")
    }
}
}

const handleDelete = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this doctor?"
    )

    if (!confirmed) {
        return
    }

    try {

        const token = localStorage.getItem("token")

        await axios.delete(
            `http://localhost:8082/doctors/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setSuccess("Doctor deleted successfully")
        setError("")

        await loadDoctors()

    } catch (error) {

        if (error.response?.data?.message) {
            setError(error.response.data.message)
        } else {
            setError("Unable to delete doctor")
        }
    }
}

const filteredDoctors = doctors.filter((doctor) => {

    const searchText = search.toLowerCase()

    return (
        doctor.name
            .toLowerCase()
            .includes(searchText) ||

        doctor.specialization
            .toLowerCase()
            .includes(searchText)
    )
})

return (
    <div className="doctors-page">

        <div className="doctors-header">

            <div>

                <h1>Doctors</h1>

                <p>
                    Manage hospital doctors and specialists
                </p>

            </div>

            <button
                className="add-doctor-button"
                onClick={openAddForm}
            >
                + Add Doctor
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

        <div className="doctors-toolbar">

            <input
                type="text"
                placeholder="Search by doctor name or specialization..."
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
            />

        </div>

        {showForm && (

            <div className="doctor-form-card">

                <h2>
                    {editingId
                        ? "Edit Doctor"
                        : "Add New Doctor"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="doctor-form-grid">

                        <div className="form-group">

                            <label>Name</label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Specialization</label>

                            <input
                                type="text"
                                name="specialization"
                                value={form.specialization}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
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
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <div className="doctor-form-actions">

                        <button
                            type="submit"
                            className="save-button"
                        >
                            {editingId
                                ? "Update Doctor"
                                : "Save Doctor"}
                        </button>

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={closeForm}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        )}

        <div className="doctors-table">

            <table>

                <thead>

                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>

                </thead>

                <tbody>

                {filteredDoctors.length === 0 ? (

                    <tr>
                        <td colSpan="6">
                            No doctors found
                        </td>
                    </tr>

                ) : (

                    filteredDoctors.map((doctor) => (

                        <tr key={doctor.id}>

                            <td>{doctor.id}</td>

                            <td>{doctor.name}</td>

                            <td>{doctor.specialization}</td>

                            <td>{doctor.email}</td>

                            <td>{doctor.phone}</td>

                            <td>

                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        openEditForm(doctor)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        handleDelete(doctor.id)
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

export default Doctors

