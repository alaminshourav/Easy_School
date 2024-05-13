import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import logoImage from "../../../assets/logo.jpeg";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  mainHeader: {
    flexDirection: "row",
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
  paraBold: {
    fontSize: 14,
    fontWeight: 600,
    padding: "5px 0",
  },
  hr: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 20,
  },
  paymentContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  para: {
    fontSize: 14,
  },
  tableMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  tableContainer: {
    flexDirection: "column",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    padding: 5,
    border: "1px solid #bfbfbf",
    textAlign: "center",
    width: "150px",
    fontSize: 14,
  },
  firstColumn: {
    padding: 5,
    border: "1px solid #bfbfbf",
    textAlign: "left",
    width: "200px",
    fontSize: 14,
  },
  monthNameCol: {
    padding: 5,
    border: "1px solid #bfbfbf",
    textAlign: "left",
    width: "200px",
    fontSize: 14,
    flexDirection: "column",
  },
  monthName: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: "5px",
  },
  totalAmount: {
    padding: 15,
    fontSize: 18,
    fontWeight: 600,
    border: "1px solid #222",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 60,
    textAlign: "center",
  },
  textBorder: {
    textAlign: "center",
    borderTop: "1px dotted #222",
    fontSize: 14,
    paddingVertical: 5,
  },
  month: {
    backgroundColor: "#7ee24f80",
    padding: "5px",
    fontSize: "8px",
    margin: "3px",
  },
});
const formatDate = (dateString: any) => {
  const momentDate = moment(dateString);
  return momentDate.format("DD-MM-YYYY");
};
const PaymentReceiptPDF = ({ data, studentData }: any) => {
  const date = formatDate(data?.paidData);
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.mainHeader}>
          <Image src={logoImage} style={styles.logo} />
          <View>
            <Text style={styles.header}>Easy School</Text>
            <Text style={styles.text}>
              24/3, Munsurabad R/A, Adabor, Dhaka-1207
            </Text>
            <Text style={styles.text}>
              <b>Money Receipt</b>
            </Text>
            <Text style={styles.text}>Student Copy</Text>
          </View>
        </View>

        <View style={styles.hr} />
        <View style={styles.paymentContent}>
          <Text style={styles.paraBold}>Name: {studentData?.username}</Text>
          <Text style={styles.para}>Section: {studentData?.section}</Text>
        </View>
        <View style={styles.paymentContent}>
          <Text style={styles.paraBold}>
            Roll No: {studentData?.rollNumber}
          </Text>
          <Text style={styles.para}>Receiver Name: {data?.receiverName}</Text>
        </View>
        <View style={styles.paymentContent}>
          <Text style={styles.paraBold}>Class: {studentData?.class}</Text>
          <Text style={styles.para}>Voucher No: {data?.transactionId}</Text>
        </View>
        <View style={styles.paymentContent}>
          <Text style={styles.paraBold}>Shift: {studentData?.shift}</Text>
          <Text style={styles.para}>Date: {date}</Text>
        </View>

        <View style={styles.tableMain}>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.firstColumn}>Particular Name</Text>
              <Text style={styles.cell}>Amount [BDT]</Text>
            </View>
            {data?.selectedItem?.map((item: any) => {
              if (item.name === "Monthly fee") {
                return (
                  <View style={styles.row} key={item?.name}>
                    <View style={styles.monthNameCol}>
                      <Text>{item?.name}</Text>
                      {item?.allMonths?.map((item: any) => (
                        <View style={styles.monthName} key={item}>
                          <Text style={styles.month}>{item}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.cell}>{item?.value}</Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.row} key={item?.name}>
                    <Text style={styles.firstColumn}>{item?.name}</Text>
                    <Text style={styles.cell}>{item?.value}</Text>
                  </View>
                );
              }
            })}
            {data?.totalAmount > 0 && (
              <View style={styles.row}>
                <Text style={styles.firstColumn}>Total Amount</Text>
                <Text style={styles.cell}>{data?.totalAmount}</Text>
              </View>
            )}
            {data?.due > 0 && (
              <View style={styles.row}>
                <Text style={styles.firstColumn}>Due</Text>
                <Text style={styles.cell}>{data?.due}</Text>
              </View>
            )}
            {data?.totalPaid > 0 && (
              <View style={styles.row}>
                <Text style={styles.firstColumn}>Paid</Text>
                <Text style={styles.cell}>{data?.totalPaid}</Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.para}>Paid Amount [BDT]</Text>
            <Text style={styles.totalAmount}>={data?.totalPaid}=</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.text}>Developed By:</Text>
          </View>
          <View>
            <Text style={styles.textBorder}>{data?.receiverName}</Text>
            <Text style={styles.text}>(Collected)</Text>
          </View>
          <View>
            <Text style={styles.textBorder}>(Checked By)</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PaymentReceiptPDF;
