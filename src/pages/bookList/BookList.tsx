import { Box, Container, Grid } from "@mui/material";
import "./bookList.css";
import { BookListProps } from "../../types/BookListProps.type";
import PDFViewer from "../../components/pdfViewer/PDFViewer";
import useFetch from "../../hooks/useFetch";

const BookList = () => {
  const { data } = useFetch<BookListProps[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/book-list`
  );

  return (
    <div className="common_height">
      <Container maxWidth={"xl"}>
        <Box sx={{ textAlign: "center" }}>
          <h2 className="common_title heading_padding">Book list </h2>
          <Box className="pdf_viewer">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
            >
              {data?.map((item: BookListProps) => (
                <PDFViewer item={item} key={item?.id} />
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default BookList;
