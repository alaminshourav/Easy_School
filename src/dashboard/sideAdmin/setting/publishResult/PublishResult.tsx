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
import {
  ClassType,
  ColumnType,
  StudentType,
} from "../../../../types/AdminProps.type";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import { useState } from "react";

const columns = [
  { id: "allExam", label: "Exam Name", minWidth: 148 },
  { id: "class", label: "Class Name", minWidth: 148 },
  { id: "class", label: "Section", minWidth: 148 },
  { id: "class", label: "Shift", minWidth: 148 },
  { id: "publish", label: "Publish", minWidth: 148 },
];

const ResultPublish = () => {
  const [examName, setExamName] = useState("");
  const [classInfo, setClassInfo] = useState<ClassType | null>(null);
  const { data: classData } = useFetch<ClassType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class`
  );
  const { data: studentData } = useFetch<StudentType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student?section=${
      classInfo?.section
    }&shift=${classInfo?.shift}&class=${classInfo?.class}`
  );

  const handleSubmit = async () => {
    const promises: any = [];

    studentData?.forEach((student: any) => {
      const updatedExamMarks = student.examMarks.map((mark: any) => {
        if (mark.examType === examName) {
          return {
            ...mark,
            status: true,
          };
        }
        return mark;
      });

      const updatedStudent = {
        ...student,
        examMarks: updatedExamMarks,
      };

      promises.push(
        axios.put(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/student/${student._id}`,
          updatedStudent
        )
      );
    });

    try {
      const results = await Promise.all(promises);
      console.log("All updates successful", results);
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>, item: any) => {
    setClassInfo(item);
    setExamName(e.target.value);
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
              {classData?.map((item: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                  <TableCell>
                    <select
                      name=""
                      id=""
                      className="text_field"
                      onChange={(e) => handleSelect(e, item)}
                    >
                      <option selected disabled>
                        Please Select
                      </option>
                      {item?.examName?.map((item: any) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>{item?.class}</TableCell>
                  <TableCell>{item?.section}</TableCell>
                  <TableCell>{item?.shift}</TableCell>
                  <TableCell>
                    <button className="view_product_btn" onClick={handleSubmit}>
                      Publish
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ResultPublish;
