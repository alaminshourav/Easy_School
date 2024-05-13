import { Box, Typography } from "@mui/material";
import "./noticeBoard.css";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useFetch from "../../../hooks/useFetch";
import { NoticeProps } from "../../../types/BookListProps.type";

const HomeNoticeBoard = () => {
  const { data } = useFetch<NoticeProps[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/notice`
  );
  const noticeURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_NOTICE;
  return (
    <div>
      <Box className="notice_main">
        <Box className="notice_header">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              color: "#fff",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <BookmarkAddedIcon /> Notice Board
          </Typography>
        </Box>
        <Box className="notice_tab_main">
          {data?.map((item) => (
            <Box className="notice_tab" key={item?._id}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  color: "#f7a31a",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {item?.title}
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  color: "#f7a31a",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <a
                  href={noticeURL + item.file}
                  download
                  style={{ color: "#f7a31a" }}
                  target="_blank"
                >
                  <ArrowDownwardIcon />
                </a>
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default HomeNoticeBoard;
