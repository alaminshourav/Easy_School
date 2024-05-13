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
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { ClassType, ColumnType } from "../../../types/AdminProps.type";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const columns = [
  { id: "year", label: "Year", minWidth: 148 },
  { id: "shift", label: "Shift", minWidth: 148 },
  { id: "class", label: "Class", minWidth: 148 },
  { id: "subject", label: "Subject", minWidth: 148 },
  { id: "section", label: "Section", minWidth: 148 },
  { id: "add_mark", label: "Add mark", minWidth: 148 },
];
const MyClass = () => {
  const { user } = useContext(AuthContext);
  const { data } = useFetch<ClassType[]>(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/class/teacher-class/filter?teacherName=${user?.username}`
  );
  const navigate = useNavigate();
  const handleClick = (id: string, subject: string) => {
    navigate(`/teacher-dashboard/teacher-mark/${id}`, {
      state: { subject },
    });
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
              {data?.map((item: any) => (
                <>
                  <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                    <TableCell>{item?.year}</TableCell>
                    <TableCell>{item?.shift}</TableCell>
                    <TableCell>{item?.class}</TableCell>
                    <TableCell>
                      {item?.subject[0]}
                      {/* <ul>
                      {item.teacher.map((item: any) => (
                        <>
                          {teacherName === item.teacherName && (
                            <li key={item.subject}>{item.subject}</li>
                          )}
                        </>
                      ))}
                    </ul> */}
                    </TableCell>
                    <TableCell>{item?.section}</TableCell>
                    <TableCell>
                      <button
                        className="view_product_btn"
                        onClick={() => handleClick(item?._id, item?.subject[0])}
                      >
                        Add mark
                      </button>
                    </TableCell>
                  </TableRow>
                  {item?.subject?.map((subject: string, i: number) => {
                    if (i === 0) {
                      return;
                    }
                    return (
                      <>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={subject}
                        >
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>{subject}</TableCell>
                          <TableCell></TableCell>
                          <TableCell>
                            <button
                              className="view_product_btn"
                              onClick={() => handleClick(item?._id, subject)}
                            >
                              Add mark
                            </button>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default MyClass;
