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
import useFetch from "../../../../hooks/useFetch";
import {
  ClassType,
  ColumnType,
  TeacherType,
} from "../../../../types/AdminProps.type";
import { useState } from "react";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../../util/message";
import Loader from "../../../../components/loader/Loader";

const columns = [
  { id: "year", label: "Year", minWidth: 148 },
  { id: "shift", label: "Shift", minWidth: 148 },
  { id: "class", label: "Class", minWidth: 148 },
  { id: "section", label: "Section", minWidth: 148 },
  { id: "teacher", label: "Teacher", minWidth: 148 },
  { id: "update", label: "Update", minWidth: 148 },
];

const TeacherSetting = () => {
  const { data: classData, loading } = useFetch<ClassType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class`
  );
  const { data: teacherData } = useFetch<TeacherType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee`
  );

  const [teacher, setTeacher] = useState("");

  const handleClass = async (id: string, subject: string) => {
    let selectedClass: any;
    classData?.forEach((item: any, i) => {
      if (item._id === id) {
        selectedClass = classData[i];
      }
    });
    classData?.map((item) => {
      item?.teacher?.forEach((singleTeacher: any, i: number) => {
        if (singleTeacher?.subject === subject) {
          delete item.teacher[i];
        }
      });
    });

    let previousTeacherData = selectedClass?.teacher || [];

    const newData = [
      ...previousTeacherData,
      {
        teacherName: teacher,
        subject,
      },
    ];
    const filterNewData = newData.filter((item) => item);
    let updatedData;
    classData?.forEach((item: any, i) => {
      if (item._id === id) {
        classData[i].teacher = filterNewData;
        updatedData = classData[i];
      }
    });

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/class/${id}`,
        updatedData
      );
      if (res.status === 200) {
        addSuccessfully("Successfully Added");
      }
    } catch (error) {
      toastError("Something is wrong");
    }
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Paper
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          {loading ? (
            <Loader />
          ) : (
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
                  {classData?.map((item: any) => {
                    let firstDefaultTeacher;
                    item?.teacher &&
                      item?.teacher?.forEach((classTeacher: any) => {
                        if (
                          classTeacher?.subject === item?.subject[0] &&
                          item.role === "teacher"
                        ) {
                          firstDefaultTeacher = classTeacher.teacherName;
                        }
                      });
                    console.log({ firstDefaultTeacher });

                    return (
                      <>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={item._id}
                        >
                          <TableCell>{item?.year}</TableCell>
                          <TableCell>{item?.shift}</TableCell>
                          <TableCell>{item?.class}</TableCell>
                          <TableCell>{item?.section}</TableCell>
                          <TableCell>{item?.subject[0]}</TableCell>
                          <TableCell>
                            <select
                              name=""
                              id=""
                              className="text_field"
                              onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                              ) => setTeacher(e.target.value)}
                              defaultValue={firstDefaultTeacher}
                            >
                              <option selected disabled>
                                Please Select
                              </option>
                              {teacherData?.map((item: any) => {
                                if (item.role === "teacher") {
                                  return (
                                    <option
                                      value={item.username}
                                      key={item.username}
                                    >
                                      {item?.username}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </TableCell>
                          <TableCell>
                            <button
                              className="view_product_btn"
                              onClick={() =>
                                handleClass(item?._id, item?.subject[0])
                              }
                            >
                              Update
                            </button>
                          </TableCell>
                        </TableRow>
                        {item?.subject?.map((subject: string, i: number) => {
                          if (i === 0) {
                            return;
                          }
                          let defaultTeacher;
                          item?.teacher &&
                            item?.teacher?.forEach((classTeacher: any) => {
                              if (classTeacher?.subject === subject) {
                                defaultTeacher = classTeacher.teacherName;
                              }
                            });
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
                                <TableCell></TableCell>
                                <TableCell>{subject}</TableCell>
                                <TableCell>
                                  <select
                                    name=""
                                    id=""
                                    className="text_field"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLSelectElement>
                                    ) => setTeacher(e.target.value)}
                                    defaultValue={
                                      defaultTeacher && defaultTeacher
                                    }
                                  >
                                    <option selected disabled>
                                      Please Select
                                    </option>

                                    {teacherData?.map((item) => {
                                      if (item?.role === "teacher") {
                                        return (
                                          <option value={item?.username}>
                                            {item?.username}
                                          </option>
                                        );
                                      }
                                    })}
                                  </select>
                                </TableCell>
                                <TableCell>
                                  <button
                                    className="view_product_btn"
                                    onClick={() =>
                                      handleClass(item?._id, subject)
                                    }
                                  >
                                    Update
                                  </button>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default TeacherSetting;
