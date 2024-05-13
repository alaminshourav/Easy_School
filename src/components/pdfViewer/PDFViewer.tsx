import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { saveAs } from "file-saver";
import { BookListProps } from "../../types/BookListProps.type";
import "./pdfViewer.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Grid } from "@mui/material";

// Set the worker source to load pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ item }: { item: BookListProps }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const bookURL: string = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_BOOK;
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number | null }) => {
    if (numPages !== null) {
      setNumPages(numPages);
    }
  };

  const goToNextPage = () => {
    if (numPages !== null && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const downloadPDF = () => {
    saveAs(bookURL + item?.file, "document.pdf");
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log(bookURL + item.file);

  return (
    <Grid item xs={12} lg={6} md={6} sx={{ position: "relative" }}>
      <div className="pdf_main_container">
        <Document
          file={bookURL + item?.file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <div className="pdf_btn_text_container">
            <p className="page_number">
              <b>Book for class: {item?.className}</b>
            </p>
            <button onClick={downloadPDF} className="download_btn">
              <ArrowDownwardIcon />
            </button>
          </div>
          <Page pageNumber={currentPage} />
          <div className="page_navigation_buttons">
            <div>
              <button
                onClick={goToPreviousPage}
                className="navigation_btn"
                disabled={currentPage === 1}
              >
                <ArrowBackIosIcon />
              </button>
            </div>
            <div>
              <span>
                {currentPage} Of {numPages}
              </span>
            </div>
            <div>
              <button
                onClick={goToNextPage}
                className="navigation_btn"
                disabled={currentPage === numPages}
              >
                <ArrowForwardIosIcon />
              </button>
            </div>
          </div>
        </Document>
      </div>
    </Grid>
  );
};

export default PDFViewer;
