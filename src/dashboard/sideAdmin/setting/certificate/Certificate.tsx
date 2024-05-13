import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import useFetch from "../../../../hooks/useFetch";
import { ColumnType, StudentType } from "../../../../types/AdminProps.type";
import { useState } from "react";
import CertificatePDF from "./CertificatePDF";

const columns = [
  { id: "photo", label: "Photo", minWidth: 148 },
  { id: "id", label: "ID", minWidth: 148 },
  { id: "class", label: "Class", minWidth: 148 },
  { id: "employName", label: "Employ Name", minWidth: 148 },
  { id: "testimonial", label: "Testimonial", minWidth: 148 },
];

const Certificate = () => {
  const [userId, setUserId] = useState("");
  const { data } = useFetch<StudentType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student?userId=${userId}`
  );

  const studentImageURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_STUDENT;
  return (
    <div>
      <Container maxWidth="xl">
        <Paper
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} lg={4} md={4}>
              <input
                type="text"
                placeholder="Search with user id"
                className="text_field"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserId(e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} lg={4} md={4}></Grid>
            <Grid item xs={12} lg={4} md={4}></Grid>
          </Grid>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={item?._id}>
                    <TableCell>
                      {item?.photo && (
                        <img
                          src={studentImageURL + item?.photo}
                          alt=""
                          className="auth_photo"
                        />
                      )}
                    </TableCell>
                    <TableCell>{item?.userId}</TableCell>
                    <TableCell>{item?.class}</TableCell>
                    <TableCell>{item?.username}</TableCell>
                    <TableCell>
                      <PDFDownloadLink
                        document={<CertificatePDF user={item} />}
                        fileName="certificate.pdf"
                      >
                        {({ loading }) => (
                          <button className="submit_btn" disabled={loading}>
                            Download
                          </button>
                        )}
                      </PDFDownloadLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
};

export default Certificate;
