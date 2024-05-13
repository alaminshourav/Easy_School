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
import { ColumnType } from "../../../../types/AdminProps.type";
import useFetch from "../../../../hooks/useFetch";
import { TeacherType } from "../../../../types/TeacherProps.type";
import { useState } from "react";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../../util/message";

const columns = [
  { id: "id", label: "ID", minWidth: 148 },
  { id: "employ_name", label: "Employ Name", minWidth: 148 },
  { id: "designation", label: "Designation", minWidth: 148 },
  { id: "Add_role", label: "Add role", minWidth: 148 },
];

const Role = () => {
  const { data: teacher, reFetch: teacherReFetch } = useFetch<TeacherType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee`
  );
  const [roles, setRoles] = useState("");
  const handleSubmit = async (id: string) => {
    const newData = {
      role: roles,
    };
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee/${id}`,
        newData
      );
      if (res.status === 200) {
        addSuccessfully("added successfully");
        teacherReFetch();
      }
    } catch (error) {
      console.log(error);
      toastError("Something is wrong");
    }
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
              {teacher?.map((item: any) => {
                if (item?.role !== "admin") {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item?._id}
                    >
                      <TableCell>{item?.employeeId}</TableCell>
                      <TableCell>{item?.username}</TableCell>
                      <TableCell>
                        <select
                          name=""
                          id=""
                          className="text_field"
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setRoles(e.target.value)
                          }
                          defaultValue={item?.role}
                        >
                          <option disabled selected>
                            Please select
                          </option>
                          <option value="office-admin">Office Admin</option>
                          <option value="teacher">Teacher</option>
                          <option value="account-admin">Account Admin</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <button
                          className="view_product_btn"
                          onClick={() => handleSubmit(item._id)}
                        >
                          Add Role
                        </button>
                      </TableCell>
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

export default Role;
