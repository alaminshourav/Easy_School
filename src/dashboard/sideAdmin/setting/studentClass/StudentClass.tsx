import {
  Box,
  Container,
  Grid,
  Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
} from "@mui/material";
import "./subject.css";
import { ClassType } from "../../../../types/AdminProps.type";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import { addSuccessfully } from "../../../../util/message";

// const columns = [
//   { id: "year", label: "Year", minWidth: 148 },
//   { id: "shift", label: "Shift", minWidth: 148 },
//   { id: "class", label: "Class", minWidth: 148 },
//   { id: "section", label: "Section", minWidth: 148 },
//   { id: "Subject", label: "Add Subject", minWidth: 148 },
//   { id: "edit", label: "Edit", minWidth: 148 },
//   { id: "delete", label: "Delete", minWidth: 148 },
// ];

const StudentClass = () => {
  const navigate = useNavigate();
  const { data, reFetch } = useFetch<ClassType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class`
  );

  const handleClick = () => {
    navigate("/site-admin/add-class");
  };
  const handleSubjectFee = (id: string) => {
    navigate(`/site-admin/add-subject/${id}`);
  };
  const handleDelete = (id: string) => {
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}/class/${id}`)
      .then((res) => {
        if (res.status === 200) {
          reFetch();
          addSuccessfully("Deleted Successfully");
        }
      });
  };

  return (
    <Container maxWidth={"xl"}>
      <Paper
        className="dashboard_container_form"
        style={{ marginTop: "120px" }}
      >
        <div className="align_left">
          <button className="common_dashboard_btn" onClick={handleClick}>
            Add Class
          </button>
        </div>

        {data?.map((item: any) => {
          const feeArray = Object.entries(item?.fee || {})?.map(
            ([key, value]) => ({
              name: key,
              value,
            })
          );
          console.log({ feeArray });

          return (
            <>
              <Box className="class_card_main" key={item?._id}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12} lg={12} md={12}>
                    <div className="class_card_heading">
                      <h3>Annual Year- {item?.year}</h3>
                      <p>
                        Shift: {item?.shift}, Class: {item?.class} , Section:-{" "}
                        {item?.section}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} lg={6} md={6}>
                    <Box className="card_left_main">
                      <div className="">
                        <h5>Subject List</h5>
                        <ol>
                          {item?.subject?.map((item: any) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="">
                        <h5>Exam Name</h5>
                        <ol>
                          {item?.examName?.map((item: any) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ol>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6} md={6}>
                    <div className="card_right">
                      <h5>Fee Setting</h5>

                      {feeArray.map((item: any) => (
                        <p key={item.name}>
                          {item?.name} -{item?.value}/-
                        </p>
                      ))}
                    </div>
                  </Grid>
                </Grid>
                <div className="btn_container_class">
                  <div>
                    <button
                      className="class_btn"
                      onClick={() => handleSubjectFee(item._id)}
                    >
                      Add Subject and Fee
                    </button>
                  </div>
                  <div>
                    <Link to={`/site-admin/edit-class/${item?._id}`}>
                      <button className="class_btn">Edit</button>
                    </Link>
                  </div>
                  <div>
                    <button
                      className="admin_de_btn"
                      onClick={() => handleDelete(item?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Box>
            </>
          );
        })}

        {/* <TableContainer sx={{ maxHeight: "90%" }}>
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
                  <TableCell>{item?.year}</TableCell>
                  <TableCell>{item?.shift}</TableCell>
                  <TableCell>{item?.class}</TableCell>
                  <TableCell>{item?.section}</TableCell>

                  <TableCell>
                    <button
                      className="view_product_btn"
                      onClick={() => handleSubjectFee(item._id)}
                    >
                      Add Subject and Fee
                    </button>
                  </TableCell>
                  <TableCell>
                    <Link to={`/site-admin/edit-class/${item?._id}`}>
                      <button className="view_product_btn">Edit</button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <button
                      className="admin_de_btn"
                      onClick={() => handleDelete(item?._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Paper>
    </Container>
  );
};

export default StudentClass;
