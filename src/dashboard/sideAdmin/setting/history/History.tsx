import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import "./history.css";

const History = () => {
  return (
    <div className="history_main">
      <TableContainer sx={{ maxHeight: "90%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            <TableRow hover role="checkbox" className="table_row" tabIndex={-1}>
              <TableCell className="table_col" style={{ textAlign: "center" }}>
                01-12-2023
              </TableCell>
              <TableCell className="table_col" style={{ textAlign: "center" }}>
                <button className="dashboard_download_btn">Download</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default History;
