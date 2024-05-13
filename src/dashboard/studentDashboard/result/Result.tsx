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
import { ColumnType, StudentType } from "../../../types/AdminProps.type";
import useFetch from "../../../hooks/useFetch";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyPDFDocument from "./PDFDwonload";

const columns = [
  { id: "subject", label: "Subject", minWidth: 70 },
  { id: "exam", label: "Exam", minWidth: 148 },
  { id: "marks", label: "Marks", minWidth: 148 },
];

const Result = () => {
  const [selectedExamType, setSelectedExamType] = useState("");
  const { user } = useContext(AuthContext);
  const { data } = useFetch<StudentType | null>(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/student/result/6637356207090e7c9f704a92`
  );

  console.log({ data });

  return (
    <Container maxWidth={"xl"}>
      <Paper style={{ marginTop: "120px" }} className="dashboard_container">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "300px" }}>
            <select
              name=""
              id=""
              className="text_field"
              onChange={(e) => setSelectedExamType(e.target.value)}
            >
              <option disabled selected>
                Please Select
              </option>
              {data?.examTypes?.map((item: any) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="dashboard_pdf_btn">
            <PDFDownloadLink
              document={
                <MyPDFDocument
                  data={data}
                  selectedExamType={selectedExamType}
                  user={user}
                />
              }
              fileName="exam_results.pdf"
            >
              {({ loading }) =>
                loading ? "Loading PDF..." : "Download as a PDF"
              }
            </PDFDownloadLink>
          </div>
        </Box>

        <TableContainer>
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
              {data?.student?.examMarks?.map((result: any) => {
                if (result.examType === selectedExamType && result.status) {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={result.examType}
                    >
                      <TableCell>{result.subject}</TableCell>
                      <TableCell>{result.examType}</TableCell>
                      <TableCell>{result.mark}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Result;
