import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ColumnType, StudentType } from "../../../../types/AdminProps.type";
import { Link } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { useState } from "react";
import Teacher from "./Teacher";
import axios from "axios";
import { TeacherType } from "../../../../types/TeacherProps.type";
import { addSuccessfully, toastError } from "../../../../util/message";

const studentColumns = [
  { id: "photo", label: "Photo", minWidth: 148 },
  { id: "id", label: "ID", minWidth: 148 },
  { id: "class", label: "Class", minWidth: 148 },
  { id: "studentName", label: "Student Name", minWidth: 148 },
  { id: "password", label: "Password", minWidth: 148 },
  { id: "edit", label: "Edit", minWidth: 148 },
  { id: "delete", label: "Delete", minWidth: 148 },
];
const teacherColumns = [
  { id: "photo", label: "Photo", minWidth: 148 },
  { id: "id", label: "ID", minWidth: 148 },
  { id: "class", label: "Class", minWidth: 148 },
  { id: "employName", label: "Employ Name", minWidth: 148 },
  { id: "password", label: "Password", minWidth: 148 },
  { id: "edit", label: "Edit", minWidth: 148 },
  { id: "delete", label: "Delete", minWidth: 148 },
];
const Registration = () => {
  const [shawTab, setShawTab] = useState("student");
  const { data: student, reFetch } = useFetch<StudentType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student`
  );
  const { data: teacher, reFetch: teacherReFetch } = useFetch<TeacherType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee`
  );
  const studentImageURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_STUDENT;
  const handleDelete = (id: string, photo: string) => {
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${shawTab}/${id}`)
      .then((res) => {
        if (shawTab === "student") {
          if (res.status === 200) {
            reFetch();
            addSuccessfully("Deleted Successfully");
          }
        } else {
          if (res.status === 200) {
            teacherReFetch();
            addSuccessfully("Deleted Successfully");
          }
        }
      })
      .catch(() => {
        toastError("Something is wrong");
      });
    try {
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/delete/${photo}?${shawTab}=${shawTab}`
        )
        .then(() => {});
    } catch (error) {}
  };

  return (
    <Container maxWidth={"xl"}>
      <Paper className="dashboard_container" style={{ marginTop: "120px" }}>
        <Box className="tab_main">
          <Box className="tab">
            <button
              className={shawTab === "student" ? "tab_btn_active" : "tab_btn"}
              onClick={() => setShawTab("student")}
            >
              Student
            </button>
            <button
              className={shawTab === "employee" ? "tab_btn_active" : "tab_btn"}
              onClick={() => setShawTab("employee")}
            >
              Employee
            </button>
          </Box>
        </Box>
        <TableContainer sx={{ maxHeight: "90%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {shawTab === "student" ? (
                <TableRow>
                  {studentColumns?.map((column: ColumnType) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              ) : (
                <TableRow>
                  {teacherColumns.map((column: ColumnType) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {shawTab === "student"
                ? student?.map((item: any) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item?._id}
                    >
                      <TableCell>
                        {item?.photo && (
                          <img
                            src={studentImageURL + item?.photo}
                            alt=""
                            className="auth_photo"
                          />
                        )}
                      </TableCell>
                      <TableCell>{item?.userId}</TableCell>
                      <TableCell>{item?.class}</TableCell>
                      <TableCell>{item?.username}</TableCell>
                      <TableCell>{item?.password}</TableCell>
                      <TableCell>
                        <Link to={`/site-admin/edit-student/${item?._id}`}>
                          <button className="view_product_btn">Edit</button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <button
                          className="admin_de_btn"
                          onClick={() => handleDelete(item?._id, item?.photo)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                : teacher?.map((item: any) => (
                    <Teacher
                      item={item}
                      key={item?._id}
                      handleDelete={handleDelete}
                    />
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Registration;
