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
import useFetch from "../../../hooks/useFetch";
import { ColumnType, StudentType } from "../../../types/AdminProps.type";
import { Link } from "react-router-dom";

const columns = [
  { id: "class", label: "Class", minWidth: 148 },
  { id: "employName", label: "Student Name", minWidth: 148 },
  { id: "edit", label: "Edit Mark", minWidth: 148 },
];
const ExamSetting = () => {
  const { data: student } = useFetch<StudentType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student`
  );
  return (
    <Container maxWidth={"xl"}>
      <Paper className="dashboard_container" style={{ marginTop: "120px" }}>
        <button className="common_dashboard_btn">Add Mark</button>

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
                  <TableCell>{item?.class}</TableCell>
                  <TableCell>{item?.username}</TableCell>
                  <TableCell>
                    <Link to={`/site-admin/edit-student/${item?._id}`}>
                      <button className="view_product_btn">Edit mark</button>
                    </Link>
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

export default ExamSetting;
