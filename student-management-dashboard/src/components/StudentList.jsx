import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../redux/studentSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/StudentList.css";

const StudentList = () => {
  const students = useSelector((state) => state.students?.students || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToastActive, setIsToastActive] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; // Adjust this number to change students per page

  // Calculate indexes for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleDelete = (id) => {
    toast.dismiss();
    setIsToastActive(true);

    toast(
      (t) => (
        <div className="toastify-confirm">
          <p>Are you sure you want to delete?</p>
          <div className="toastify-btns">
            <button
              className="toastify-btn confirm"
              onClick={() => {
                dispatch(deleteStudent(id));
                toast.dismiss(t.id);
                toast.success("Student deleted successfully!", {
                  position: "top-right",
                });
                setIsToastActive(false);
              }}
            >
              Yes, Delete
            </button>
            <button
              className="toastify-btn cancel"
              onClick={() => {
                toast.dismiss(t.id);
                setIsToastActive(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        position: "top-center",
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        onClose: () => setIsToastActive(false),
      }
    );
  };

  return (
    <div className={`list-container ${isToastActive ? "blur-background" : ""}`}>
      <div className="contain-head">
        <h2 className="heading">Student Management</h2>
        <button className="add-btn" onClick={() => navigate("/add")}>
          Add Student
        </button>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Department</th>
            {students.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6">
                <div className="empty-state">
                  <p>No students added yet.</p>
                  <button className="empty-add-btn" onClick={() => navigate("/add")}>
                    Add Student
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td className="truncate">{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.gender}</td>
                <td>{student.department}</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => navigate(`/edit/${student.id}`)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {students.length > studentsPerPage && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentList;
