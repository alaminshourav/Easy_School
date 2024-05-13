import { Link, useNavigate } from "react-router-dom";
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
import { ColumnType } from "../../../types/AdminProps.type";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { NoticeProps } from "../../../types/BookListProps.type";
import { addSuccessfully, toastError } from "../../../util/message";

const columns = [
  { id: "id", label: "Id", minWidth: 70 },
  { id: "title", label: "Title", minWidth: 148 },
  { id: "edit", label: "Edit", minWidth: 148 },
  { id: "delete", label: "Delete", minWidth: 148 },
];

const DashboardNotice = () => {
  const navigate = useNavigate();
  const { data, reFetch } = useFetch<NoticeProps[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/notice`
  );
  const handleClick = () => {
    navigate("/office-admin/add-notice");
  };

  const handleDelete = async (id: string, link: string) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/notice/${id}`
      );
      if (res.status === 200) {
        reFetch();
        addSuccessfully("Successfully Deleted");
      }
    } catch (error) {
      toastError("Something is wrong");
    }
    try {
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/delete/${link}?notice=notice`
        )
        .then(() => {});
    } catch (error) {}
  };

  return (
    <Container maxWidth={"xl"}>
      <Paper className="dashboard_container" style={{ marginTop: "120px" }}>
        <div className="align_left">
          <button className="common_dashboard_btn" onClick={handleClick}>
            Add Notice
          </button>
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
              {data?.map((item: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                  <TableCell>{item?._id}</TableCell>
                  <TableCell>{item?.title}</TableCell>

                  <TableCell>
                    <Link to={`/office-admin/edit-notice/${item._id}`}>
                      <button className="view_product_btn">Edit</button>
                    </Link>
                  </TableCell>

                  <TableCell>
                    <button
                      className="admin_de_btn"
                      onClick={() => handleDelete(item._id, item.file)}
                    >
                      Delete
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

export default DashboardNotice;
