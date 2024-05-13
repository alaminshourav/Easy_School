import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const Teacher = ({ item, handleDelete }: any) => {
  const teacherImageURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_TEACHER;

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        {item?.photo && (
          <img
            src={teacherImageURL + item?.photo}
            alt=""
            className="auth_photo"
          />
        )}
      </TableCell>
      <TableCell>{item?.employeeId}</TableCell>
      <TableCell>{item?.role}</TableCell>
      <TableCell>{item?.username}</TableCell>
      <TableCell>{item?.password}</TableCell>
      <TableCell>
        <Link to={`/site-admin/edit-teacher/${item?._id}`}>
          <button className="view_product_btn">Edit</button>
        </Link>
      </TableCell>
      <TableCell>
        <button
          className="admin_de_btn"
          onClick={() => handleDelete(item?._id, item?.photo)}
        >
          Delete
        </button>
      </TableCell>
    </TableRow>
  );
};

export default Teacher;
