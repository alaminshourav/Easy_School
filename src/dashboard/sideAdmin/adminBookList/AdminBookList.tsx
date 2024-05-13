import "./adminBookList.css";
import "../adminSidebar/adminSidebar.css";
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
import { BookListProps } from "../../../types/BookListProps.type";
import { addSuccessfully, toastError } from "../../../util/message";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const columns = [
  { id: "id", label: "Id", minWidth: 70 },
  { id: "class", label: "Class", minWidth: 148 },
  { id: "edit", label: "Edit", minWidth: 148 },
  { id: "delete", label: "Delete", minWidth: 148 },
];

const AdminBookList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { data, reFetch } = useFetch<BookListProps[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/book-list`
  );
  const handleClick = () => {
    if (user?.role === "admin") {
      navigate("/site-admin/add-book-list");
    } else {
      navigate("/office-admin/add-book-list");
    }
  };

  const handleDelete = async (id: string, link: string) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/book-list/${id}`
      );
      if (res.status === 200) {
        reFetch();
        addSuccessfully("Deleted Successfully");
      }
    } catch (error) {
      toastError("Something is wrong");
    }
    try {
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/delete/${link}?book-list=book-list`
        )
        .then(() => {});
    } catch (error) {}
  };

  return (
    <Container maxWidth={"xl"}>
      <Paper className="dashboard_container" style={{ marginTop: "120px" }}>
        <div className="align_left">
          <button className="common_dashboard_btn" onClick={handleClick}>
            Add Book list
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
                  <TableCell>{item?.className}</TableCell>

                  <TableCell>
                    <Link to={`/office-admin/edit-book-list/${item._id}`}>
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
              {/* {data?.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <>
                    {row?.products?.map((item) => {
                      return (
                        <>
                          {<TableCell>{row?.requestId}</TableCell>}
                          {<TableCell>{row?.bookingStatus}</TableCell>}
                          {row?.payment_status && (
                            <TableCell
                              style={{ cursor: "pointer", color: "green" }}
                            >
                              {row?.payment_status}
                            </TableCell>
                          )}
                          <TableCell>{row?.userEmail}</TableCell>
                          <TableCell>
                            {row?.hostEmail && row?.hostEmail}
                          </TableCell>
                          <TableCell>
                            {format(
                              new Date(row?.bookingDate[0]?.startDate),
                              "yyyy/MM/dd"
                            )}{" "}
                            To{" "}
                            {format(
                              new Date(row?.bookingDate[0]?.endDate),
                              "yyyy/MM/dd"
                            )}
                          </TableCell>
                          <TableCell style={{ textAlign: "right" }}>
                            <Link to={`/details/${item._id}`}>
                              <button className="view_product_btn">
                                See Warehouse
                              </button>
                            </Link>
                          </TableCell>
                        </>
                      );
                    })}
                  </>
                </TableRow>
              );
            })} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AdminBookList;
