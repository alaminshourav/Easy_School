import { Container, Paper } from "@mui/material";
import { StyleSheet } from "@react-pdf/renderer";
import image from "../../../../assets/logo.jpeg";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  mainHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 80,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
  },
  hr: {
    margin: "20px 0",
  },
  paymentContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  para: {
    fontSize: 14,
  },
  tableMain: {
    display: "flex",
    gap: "3rem",
    alignItems: "center",
    padding: "40px 0",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  cell: {
    padding: "5px",
    border: "1px solid #bfbfbf", // Unified border setting
    textAlign: "center",
    width: "200px",
  },
  firstColumn: {
    padding: "5px",
    border: "1px solid #bfbfbf", // Unified border setting
    textAlign: "left",
    width: "250px",
    display: "flex",
    flexDirection: "column",
  },
  totalAmount: {
    border: "1px solid #222",
    padding: "15px 5px",
    fontSize: 18,
    fontWeight: 600,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "60px 0",
  },
  textBorder: {
    borderTop: "1px dotted #222",
    fontSize: "14px",
    padding: "5px 0",
    textAlign: "center",
  },
  monthName: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.1rem",
    paddingTop: "5px",
  },
  month: {
    backgroundColor: "#7ee24f80",
    padding: "5px",
  },
});

const Pay = () => {
  return (
    <div>
      <Container maxWidth="xl">
        <Paper
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <div style={styles.page}>
            <div style={styles.mainHeader}>
              <img src={image} alt="" style={styles.logo} />
              <div>
                <h3 style={styles.header}>Easy School</h3>
                <p style={styles.text}>
                  24/3, Munsurabad R/A, Adabor, Dhaka-1207
                </p>
                <p style={{ fontSize: 14, paddingTop: "10px" }}>
                  <b>Mony Receipt</b>
                </p>
                <p style={{ fontSize: 14, paddingTop: "15px" }}>Student Copy</p>
              </div>
            </div>
            <hr style={styles.hr} />
            <div style={styles.paymentContent}>
              <div>
                <p style={styles.para}>
                  <b>User: 24001</b>
                </p>
                <p style={styles.para}>Bank Name: Cash in Hand Cluster - 1</p>
              </div>
              <div>
                <p style={styles.para}>
                  <b>Name: Al-Amin Shourav</b>
                </p>
                <p style={styles.para}>Voucher No: 21CV-196</p>
              </div>
              <div>
                <p style={styles.para}>
                  <b>Semester: Spring 2024</b>
                </p>
                <p style={styles.para}>Slip Id: 1086248</p>
              </div>
              <div>
                <p style={styles.para}>
                  <b>Program: Bsc in CSE (Dip)</b>
                </p>
                <p style={styles.para}>Date: 07-05-2024</p>
              </div>
            </div>
            <div style={styles.tableMain}>
              <div style={styles.tableContainer}>
                <div style={styles.tableHeader}>
                  <div style={styles.firstColumn}>Particular Name</div>
                  <div style={styles.cell}>Amount [BDT]</div>
                </div>
                <div style={styles.row}>
                  <div style={styles.firstColumn}>
                    <span>Office Supplies</span>
                    <div style={styles.monthName}>
                      <p style={styles.month}>January</p>
                      <p style={styles.month}>fab</p>
                    </div>
                  </div>

                  <div style={styles.cell}>1500</div>
                </div>
                <div style={styles.row}>
                  <div style={styles.firstColumn}>Travel Expenses</div>
                  <div style={styles.cell}>3200</div>
                </div>
                <div style={styles.row}>
                  <div style={styles.firstColumn}>Utility Bills</div>
                  <div style={styles.cell}>2400</div>
                </div>
                <div style={styles.row}>
                  <div style={styles.firstColumn}>Advertising</div>
                  <div style={styles.cell}>5000</div>
                </div>
              </div>
              <div>
                <div>
                  <p style={styles.para}>Paid Amount [BDT]</p>
                  <h6 style={styles.totalAmount}>=9445=</h6>
                </div>
              </div>
            </div>
            <div style={styles.footer}>
              <div>
                <p>Developed By: </p>
              </div>
              <div>
                <p style={styles.textBorder}>Takrim</p>
                <p>(Collected)</p>
              </div>
              <div>
                <p style={styles.textBorder}>(Checked By)</p>
              </div>
            </div>
            <div>
              <p style={styles.text}>
                192.168.105.2/Accounts/Report/StudentMoneyReceipt?transId=1086348&stdId=59728
              </p>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Pay;
