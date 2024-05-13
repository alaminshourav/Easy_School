import { Container, Paper } from "@mui/material";
import "./generalSection.css";

const GeneralSection = () => {
  return (
    <div>
      <Container maxWidth={"xl"}>
        <Paper className="dashboard_container" style={{ marginTop: "120px" }}>
          <h2>this is General Section</h2>
        </Paper>
      </Container>
    </div>
  );
};

export default GeneralSection;
