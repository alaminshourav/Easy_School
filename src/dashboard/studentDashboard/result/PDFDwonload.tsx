import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useMemo } from "react";
import image from "../../../assets/logo.jpeg";
import resultLogo from "../../../assets/result.jpg";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  header2: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  studentDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  leftImage: {
    width: 50,
    height: 50,
  },
  rightImage: {
    width: 100,
    height: 80,
  },
  centerText: {
    textAlign: "center",
    flexGrow: 1,
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
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  textStyle: {
    fontSize: 14,
    paddingBottom: 5,
  },
  logoContentMain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  resultImage: {
    width: "100px",
    height: "100%",
  },
  smallText: {
    fontSize: 10,
  },
  square: {
    width: 25,
    height: 25,
    backgroundColor: "red",
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12,
    backgroundColor: "#0dc00dc4",
  },

  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 25,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "green",
  },
  signerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "100px 0px 10px 0px",
  },
  singeText: {
    borderTop: "1px solid #222",
    fontSize: 14,
    padding: "3px 0",
  },
});

const MyPDFDocument = ({ data, selectedExamType, user }: any) => {
  const filteredResults = useMemo(
    () =>
      data?.student?.examMarks?.filter(
        (result: any) => result.examType === selectedExamType && result.status
      ),
    [data, selectedExamType]
  );

  // name
  // rool no
  // section
  // shift
  // class
  // 40 < red
  // 40 > 70
  // 70 > 99
  console.log({ data });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContentMain}>
          <View style={styles.logoContent}>
            <Image src={image} style={styles.leftImage} />
            <View>
              <Text style={styles.header}>Easy School</Text>
              <Text style={styles.smallText}>
                11/a Road, Dhaka, Bangladesh.
              </Text>
              <Text style={styles.smallText}>Mobile: 01711-062807</Text>
            </View>
          </View>
          <Image src={resultLogo} style={styles.resultImage} />
        </View>

        {/* <Text style={styles.header}>{selectedExamType} 2024</Text>
         */}
        <View>
          <Text style={styles.header2}>{selectedExamType} - 2024</Text>
        </View>
        <View style={styles.studentDetails}>
          <View style={{ flexDirection: "column", paddingTop: 15 }}>
            <Text style={styles.textStyle}>
              Name of Student: {user.username}
            </Text>
            <Text style={styles.textStyle}>Roll No: {user?.rollNumber}</Text>
            <Text style={styles.textStyle}>Section: {user?.section}</Text>
            <Text style={styles.textStyle}>Shift: {user?.shift}</Text>
            <Text style={styles.textStyle}>Class: {user?.address}</Text>
          </View>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, { width: "50%" }]}>Subject Name</Text>
            <Text style={[styles.cell, { width: "50%" }]}>
              Assessment Result
            </Text>
          </View>

          {filteredResults?.map((result: any, index: any) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, { width: "50%" }]}>
                {result.subject}
              </Text>
              <View style={[styles.cell, { width: "50%" }]}>
                {result.mark}
                {Number(result.mark) < 40 && <View style={styles.square} />}
                {Number(result.mark) >= 40 && Number(result.mark) < 70 && (
                  <View style={styles.circle} />
                )}
                {Number(result.mark) >= 70 && <View style={styles.triangle} />}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.signerContainer}>
          <Text style={styles.singeText}>Guardian</Text>
          <Text style={styles.singeText}>Class Teacher</Text>
          <Text style={styles.singeText}>Head Mistress</Text>
        </View>
      </Page>
    </Document>
  );
};
export default MyPDFDocument;
