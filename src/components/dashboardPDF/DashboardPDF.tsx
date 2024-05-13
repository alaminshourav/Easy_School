import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid } from "@mui/material";
import { DashboardPDFProps } from "../../types/AdminProps.type";

// Set the worker source to load pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const DashboardPDF: React.FC<DashboardPDFProps> = ({ link }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Grid item xs={12} lg={6} md={6} sx={{ position: "relative" }}>
      <div className="pdf_main_container">
        <Document file={link} onLoadSuccess={onDocumentLoadSuccess}>
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

export default DashboardPDF;
