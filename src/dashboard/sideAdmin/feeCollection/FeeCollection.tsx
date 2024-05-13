import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ColumnType, StudentType } from "../../../types/AdminProps.type";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./feeCollection.css";
import { useState } from "react";

const columns = [
  { id: "photo", label: "Photo", minWidth: 148 },
  { id: "id", label: "ID", minWidth: 140 },
  { id: "class", label: "Class", minWidth: 100 },
  { id: "student_name", label: "Name", minWidth: 148 },
  { id: "shift", label: "Shift", minWidth: 100 },
  { id: "section", label: "Section", minWidth: 148 },
  { id: "roll", label: "Roll", minWidth: 100 },
  { id: "fee", label: "Fee", minWidth: 148 },
];

const FeeCollection = () => {
  const [username, setUsername] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [classes, setClass] = useState("");
  const [userId, setUserId] = useState("");
  const { data: student } = useFetch<StudentType[]>(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/student?userId=${userId}&rollNumber=${rollNumber}&class=${classes}&username=${username}`
  );
  const navigate = useNavigate();
  const studentImageURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_STUDENT;

  const handleClick = (item: any) => {
    navigate(`/site-admin/add-fee`, {
      state: {
        studentData: item,
      },
    });
  };

  return (
    <div>
      <Container maxWidth={"xl"}>
        <Paper className="dashboard_container" style={{ marginTop: "120px" }}>
          <div className="fee_input_container">
            <input
              type="text"
              placeholder="id number"
              className="text_field"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserId(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="student name"
              className="text_field"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="class"
              className="text_field"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClass(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="roll number"
              className="text_field"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRollNumber(e.target.value)
              }
            />
          </div>
          <TableContainer sx={{ maxHeight: "90%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column: ColumnType) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {student?.map((item: any) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item?._id}>
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
                    <TableCell>{item?.shift}</TableCell>
                    <TableCell>{item?.section}</TableCell>
                    <TableCell>{item?.rollNumber}</TableCell>
                    <TableCell>
                      <button
                        className="view_product_btn"
                        onClick={() => handleClick(item)}
                      >
                        Add Fee
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
};

export default FeeCollection;
