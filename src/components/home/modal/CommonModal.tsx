import { Box, Button, Modal, Typography } from "@mui/material";
import "./commonModal.css";
import { useState } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const CommonModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Box className="model_btn">
        <Button onClick={handleOpen}>
          <DescriptionOutlinedIcon />
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="mode_main">
          <Box className="modal_header">
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
            <Typography id="modal-modal-description">
              <CloseIcon
                sx={{ color: "#fff", cursor: "pointer" }}
                onClick={() => setOpen(false)}
              />
            </Typography>
          </Box>

          <Box className="notice_tab_main">
            <Box className="notice_tab">
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
                Eid Celebration Program
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
                <CalendarMonthOutlinedIcon /> 12 July 24
              </Typography>
            </Box>
            <Box className="notice_tab">
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
                Eid Celebration Program
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
                <CalendarMonthOutlinedIcon /> 12 July 24
              </Typography>
            </Box>
            <Box className="notice_tab">
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
                Eid Celebration Program
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
                <CalendarMonthOutlinedIcon /> 12 July 24
              </Typography>
            </Box>
            <Box className="notice_tab">
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
                Eid Celebration Program
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
                <CalendarMonthOutlinedIcon /> 12 July 24
              </Typography>
            </Box>
            <Box className="notice_tab">
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
                Eid Celebration Program
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
                <CalendarMonthOutlinedIcon /> 12 July 24
              </Typography>
            </Box>
            <Box className="notice_tab">
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
                Eid Celebration Program
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
                <CalendarMonthOutlinedIcon /> 12 July 24
              </Typography>
            </Box>
            <Box className="notice_tab">
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
                Eid Celebration Program
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
                <CalendarMonthOutlinedIcon /> 12 July 24
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CommonModal;
