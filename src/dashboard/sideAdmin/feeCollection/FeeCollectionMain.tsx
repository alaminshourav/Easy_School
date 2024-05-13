import { Box, Container, Grid, Paper } from "@mui/material";
import FeeChart from "./FeeChart";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/loader/Loader";
import ReactDatePicker from "react-datepicker";

type FeeData = {
  date: any;
  totalPaid: any;
};

const FeeCollectionMain = () => {
  const [data, setData] = useState<FeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryDate = date.toISOString();
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/student/payment/single/daily?date=${queryDate}`
        );
        setData(response.data);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  return (
    <div>
      <Container maxWidth={"xl"}>
        {loading ? (
          <Loader />
        ) : (
          <Paper
            className="dashboard_container_form"
            style={{ marginTop: "120px" }}
          >
            <Box sx={{ py: 7 }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} lg={8} md={8}>
                  <div className="today_pay">
                    <h3 className="dashboard_common_title">
                      Today Total Pay: <b>{data?.totalPaid}</b>
                    </h3>
                  </div>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Pay Date
                  </label>
                  <ReactDatePicker
                    className="text_field"
                    selected={date}
                    onChange={(date: any) => setDate(date)}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
            <FeeChart />
          </Paper>
        )}
      </Container>
    </div>
  );
};

export default FeeCollectionMain;
