import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import {
  ClassType,
  ColumnType,
  StudentType,
} from "../../../types/AdminProps.type";
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
import { useState } from "react";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../util/message";

const columns = [
  {
    id: "roll",
    label: "Roll Number",
    minWidth: 148,
  },
  {
    id: "name",
    label: "Student Name",
    minWidth: 148,
  },
  {
    id: "exam",
    label: "Exam",
    minWidth: 148,
  },
  {
    id: "mark",
    label: "Marks",
    minWidth: 148,
  },
  {
    id: "add",
    label: "Update",
    minWidth: 148,
  },
];

const TeacherMark = () => {
  const { id } = useParams();
  const { data: classData } = useFetch<ClassType | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class/${id}`
  );
  const [previousExamMar, setPreviousExamMark] = useState([]);
  const [examType, setExamType] = useState("");
  const [mark, setMark] = useState("");
  const classItem = classData;
  const location = useLocation();
  const navigate = useNavigate();
  const subjectName = location.state.subject;

  const { data: studentData } = useFetch<StudentType[] | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student?class=${
      classItem?.class
    }&shift=${classItem?.shift}&section=${classItem?.section}`
  );

  const handleSubmit = async (id: string) => {
    const examMarks: any = {
      examType,
      mark,
      subject: subjectName,
      status: false,
    };
    const combinedExamMarks = [...previousExamMar, examMarks];

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/student/${id}`,
        { examMarks: combinedExamMarks }
      );
      if (res.status === 200) {
        addSuccessfully("Mark added successfully");
      }
    } catch (error) {
      toastError("Something is wrong");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, item: any) => {
    setExamType(e.target.value);
    console.log({ item });

    setPreviousExamMark(item);
  };

  let value: string | undefined;
  previousExamMar?.forEach((item: any) => {
    if (item.examType === examType) {
      value = `already added ${item.mark}`;
    }
  });
  const handleBack = () => {
    navigate("/teacher-dashboard/my-class");
  };
  return (
    <Container maxWidth={"xl"}>
      <Paper className="dashboard_container" style={{ marginTop: "120px" }}>
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
              {studentData?.map((item: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                  <TableCell>{item?.rollNumber}</TableCell>
                  <TableCell>{item?.username}</TableCell>
                  <TableCell>
                    <select
                      name=""
                      id=""
                      className="text_field"
                      onChange={(e) => handleChange(e, item.examMarks)}
                    >
                      <option disabled selected>
                        Please Select
                      </option>
                      {classItem?.examName?.map((exam: string) => (
                        <option key={exam} value={exam}>
                          {exam}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMark(e.target.value)
                      }
                      className="text_field"
                      placeholder="add mark"
                      defaultValue={value}
                      disabled={previousExamMar?.some(
                        (item: any) => item.examType === examType
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      className="view_product_btn"
                      onClick={() => handleSubmit(item._id)}
                      disabled={previousExamMar?.some(
                        (item: any) => item.examType === examType
                      )}
                    >
                      Update
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="dashboard_btn_container">
          <button className="submit_btn" onClick={handleBack}>
            Previous
          </button>
          <button className=""></button>
        </div>
      </Paper>
    </Container>
  );
};

export default TeacherMark;
