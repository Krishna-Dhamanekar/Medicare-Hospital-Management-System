import { useEffect, useState } from "react"
import axios from "axios"

function Appointments() {

    const [appointments, setAppointments] = useState([])
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])

    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const [search, setSearch] = useState("")

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [form, setForm] = useState({
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        patientId: "",
        doctorId: ""
    })

    const loadAppointments = async () => {

        try {
            const token = localStorage.getItem("token")

            const response = await axios.get(
                "http://localhost:8082/appointments",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setAppointments(response.data)

        } catch {
            setError("Unable to load appointments")
        }
    }

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
            await loadAppointments()
            await loadPatients()
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
            appointmentDate: "",
            appointmentTime: "",
            reason: "",
            patientId: "",
            doctorId: ""
        })

        setError("")
        setSuccess("")
        setShowForm(true)
    }

    const openEditForm = (appointment) => {

        setEditingId(appointment.id)

        setForm({
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            reason: appointment.reason,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId
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

            const appointmentData = {
                appointmentDate: form.appointmentDate,
                appointmentTime: form.appointmentTime,
                reason: form.reason,
                patientId: Number(form.patientId),
                doctorId: Number(form.doctorId)
            }

            if (editingId) {

                await axios.put(
                    `http://localhost:8082/appointments/${editingId}`,
                    appointmentData,
                    config
                )

                setSuccess("Appointment updated successfully")

            } else {

                await axios.post(
                    "http://localhost:8082/appointments",
                    appointmentData,
                    config
                )

                setSuccess("Appointment created successfully")
            }

            setForm({
                appointmentDate: "",
                appointmentTime: "",
                reason: "",
                patientId: "",
                doctorId: ""
            })

            setEditingId(null)
            setShowForm(false)

            await loadAppointments()

        } catch (error) {

            if (error.response?.data?.message) {
                setError(error.response.data.message)
            } else {
                setError("Unable to save appointment")
            }
        }
    }

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this appointment?"
        )

        if (!confirmed) {
            return
        }

        try {

            const token = localStorage.getItem("token")

            await axios.delete(
                `http://localhost:8082/appointments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setSuccess("Appointment deleted successfully")
            setError("")

            await loadAppointments()

        } catch (error) {

            if (error.response?.data?.message) {
                setError(error.response.data.message)
            } else {
                setError("Unable to delete appointment")
            }
        }
    }

    const getPatientName = (patientId) => {

        const patient = patients.find(
            (patient) => patient.id === patientId
        )

        return patient ? patient.name : `Patient #${patientId}`
    }

    const getDoctorName = (doctorId) => {

        const doctor = doctors.find(
            (doctor) => doctor.id === doctorId
        )

        return doctor ? doctor.name : `Doctor #${doctorId}`
    }

    const filteredAppointments = appointments.filter((appointment) => {

        const patientName =
            getPatientName(appointment.patientId).toLowerCase()

        const doctorName =
            getDoctorName(appointment.doctorId).toLowerCase()

        const searchText = search.toLowerCase()

        return (
            patientName.includes(searchText) ||
            doctorName.includes(searchText) ||
            appointment.reason.toLowerCase().includes(searchText)
        )
    })

    return (
        <div className="appointments-page">

            <div className="appointments-header">

                <div>
                    <h1>Appointments</h1>
                    <p>Manage hospital appointments</p>
                </div>

                <button
                    className="add-appointment-button"
                    onClick={openAddForm}
                >
                    + Add Appointment
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

            <div className="appointments-toolbar">

                <input
                    type="text"
                    placeholder="Search by patient, doctor or reason..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

            </div>

            {showForm && (
                <div className="appointment-form-card">

                    <h2>
                        {editingId
                            ? "Edit Appointment"
                            : "Add Appointment"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="appointment-form-grid">

                            <div className="form-group">
                                <label>Patient</label>

                                <select
                                    name="patientId"
                                    value={form.patientId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select patient
                                    </option>

                                    {patients.map((patient) => (
                                        <option
                                            key={patient.id}
                                            value={patient.id}
                                        >
                                            {patient.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Doctor</label>

                                <select
                                    name="doctorId"
                                    value={form.doctorId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select doctor
                                    </option>

                                    {doctors.map((doctor) => (
                                        <option
                                            key={doctor.id}
                                            value={doctor.id}
                                        >
                                            {doctor.name} - {doctor.specialization}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Date</label>

                                <input
                                    type="date"
                                    name="appointmentDate"
                                    value={form.appointmentDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Time</label>

                                <input
                                    type="time"
                                    name="appointmentTime"
                                    value={form.appointmentTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group appointment-reason">
                                <label>Reason</label>

                                <textarea
                                    name="reason"
                                    placeholder="Enter appointment reason"
                                    value={form.reason}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="appointment-form-actions">

                            <button
                                type="submit"
                                className="save-button"
                            >
                                {editingId
                                    ? "Update Appointment"
                                    : "Save Appointment"}
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

            <div className="appointments-table">

                <table>

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>

                    {filteredAppointments.length === 0 ? (

                        <tr>
                            <td colSpan="7">
                                No appointments found
                            </td>
                        </tr>

                    ) : (

                        filteredAppointments.map((appointment) => (

                            <tr key={appointment.id}>

                                <td>{appointment.id}</td>

                                <td>
                                    {getPatientName(
                                        appointment.patientId
                                    )}
                                </td>

                                <td>
                                    {getDoctorName(
                                        appointment.doctorId
                                    )}
                                </td>

                                <td>
                                    {appointment.appointmentDate}
                                </td>

                                <td>
                                    {appointment.appointmentTime}
                                </td>

                                <td>
                                    {appointment.reason}
                                </td>

                                <td>

                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            openEditForm(appointment)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(
                                                appointment.id
                                            )
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

export default Appointments