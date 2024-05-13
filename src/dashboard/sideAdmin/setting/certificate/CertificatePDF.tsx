import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import moment from "moment";
import logoImage from "../../../../assets/logo.jpeg"; // Adjust the path as needed

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  mainHeader: {
    flexDirection: "row",
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
    paddingTop: "5px",
  },
  hr: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 20,
  },
  h6: {
    fontSize: 14,
    textAlign: "right",
  },
  para: {
    fontSize: 14,
    paddingVertical: 15,
  },
  para2: {
    fontSize: 14,
  },
  footerParaMain: {
    paddingTop: 20,
  },
  footerPara: {
    fontSize: 14,
  },
  secondHr: {
    marginVertical: 100,
    height: 1,
    backgroundColor: "#000",
  },
  footer: {
    textAlign: "right",
  },
  mainTitle: {
    paddingVertical: 25,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    backgroundColor: "#ddd",
    padding: 5,
    textAlign: "center",
  },
});

// TestimonialPDF component
const CertificatePDF = ({ user }: any) => {
  const formatDate = (dateString: any) => {
    const date = moment(dateString);
    return date.format("Do MMMM YYYY");
  };

  const formattedDate = formatDate(user?.birthDate);

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
            <Text style={styles.text}>Mobile: 01711062807</Text>
          </View>
        </View>

        <View style={styles.hr} />

        <View>
          <Text style={styles.h6}>Date: 20-05-2024</Text>
        </View>

        <View style={styles.mainTitle}>
          <Text style={styles.title}>Transfer Certificate</Text>
        </View>

        <View>
          <Text style={styles.para}>
            Transfer Certificate This is to certify that {user?.username},
            Father's name: {user?.parentDetailsFather.name}, Mother's name:
            {user?.parentDetailsMother.name}. Her date. ofBirth {formattedDate}.
            She has successfully completed the class {user?.class} at this
            school.
          </Text>
          <Text style={styles.para2}>
            I express my best wishes for his prosperous future and trust that he
            will achieve success in all his endeavors.
          </Text>
        </View>

        <View style={styles.footerParaMain}>
          <Text style={styles.footerPara}>Principal</Text>
          <Text style={styles.footerPara}>Sweet Bird School</Text>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePDF;
