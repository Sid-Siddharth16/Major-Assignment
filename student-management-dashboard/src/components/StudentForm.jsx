import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addStudent, updateStudent } from "../redux/studentSlice";
import { toast } from "react-toastify";
import "../styles/StudentForm.css";

const StudentForm = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.students || []);


  // Find the student if editing
  const existingStudent = students.find((s) => s.id === id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (existingStudent) {
      setFormData(existingStudent);
    }
  }, [existingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone must be exactly 10 digits");
      return;
    }

    if (!formData.gender) {
      toast.error("Please select a gender");
      return;
    }

    if (!formData.department) {
      toast.error("Please select a department");
      return;
    }

    if (existingStudent) {
      dispatch(updateStudent({ id, ...formData }));
      toast.success("Student updated successfully!");
    } else {
      dispatch(addStudent({ id: Date.now().toString(), ...formData }));
      toast.success("Student added successfully!");
    }

    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>{existingStudent ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Gender:</label>
        <div className="gender-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <select className="department" name="department" value={formData.department} onChange={handleChange}>
          <option value="">Select Department</option>
          <option value="Computer Science">ReactJS</option>
          <option value="Electronics">NodeJS</option>
          <option value="Mechanical">QA</option>
          <option value="Mechanical">Flutter</option>
        </select>

        <button type="submit">{existingStudent ? "Update Student" : "Add Student"}</button>
      </form>
    </div>
  );
};

export default StudentForm;
