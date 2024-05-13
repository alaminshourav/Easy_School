import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./classWise.css";
import { SettingColumnType } from "../../../../types/AdminProps.type";
const columns = [
  {
    id: "shift",
    label: "Shift",
    minWidth: 148,
    color: "#00aeff",
    fontWeight: 600,
  },
  {
    id: "class",
    label: "Class",
    minWidth: 148,
    color: "#00aeff",
    fontWeight: 600,
  },
  {
    id: "section",
    label: "Section",
    minWidth: 148,
    color: "#00aeff",
    fontWeight: 600,
  },
  {
    id: "subjectName",
    label: "Subject Name",
    minWidth: 148,
    color: "#00aeff",
    fontWeight: 600,
  },
  {
    id: "teacherName",
    label: "Teacher Name",
    minWidth: 148,
    color: "#00aeff",
    fontWeight: 600,
  },
];
const ClassWise = () => {
  return (
    <div>
      <TableContainer sx={{ maxHeight: "90%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: SettingColumnType) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    color: column.color,
                    fontWeight: column.fontWeight,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell className="table_col">Morning</TableCell>
              <TableCell className="table_col">One</TableCell>
              <TableCell className="table_col">A</TableCell>
              <TableCell className="table_col">Bangla</TableCell>
              <TableCell className="table_col">Asif</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClassWise;
