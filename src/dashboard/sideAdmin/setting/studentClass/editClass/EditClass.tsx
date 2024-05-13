import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClassType } from "../../../../../types/AdminProps.type";
import useFetch from "../../../../../hooks/useFetch";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../../../util/message";

const EditClass = () => {
  const { id } = useParams();
  const { data } = useFetch<ClassType>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class/${id}`
  );
  const [year, setYear] = useState("");
  const [shift, setShift] = useState("");
  const [classes, setClass] = useState("");
  const [section, setSection] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [examNames, setExamNames] = useState([]);
  const [fees, setFees] = useState({});
  const [updatedFee, setUpdatedFee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    data?.year && setYear(data.year);
    data?.shift && setShift(data.shift);
    data?.class && setClass(data.class);
    data?.section && setSection(data.section);
    data?.subject && setSubjects(data.subject);
    data?.examName && setExamNames(data.examName);
    data?.fee && setFees(data.fee);
  }, [data]);

  useEffect(() => {
    if (fees) {
      const feeArray: any = Object.entries(fees).map(([name, value]) => ({
        name,
        value,
      }));

      setUpdatedFee(feeArray);
    }
  }, [fees]);

  const handleSubjectChange = (index: number, newSubject: any) => {
    setSubjects((prevSubjects: any) =>
      prevSubjects.map((subject: string, i: number) =>
        i === index ? newSubject : subject
      )
    );
  };
  const handleExamNameChange = (index: number, newExamName: any) => {
    setExamNames((prevExamName: any) =>
      prevExamName.map((examName: string, i: number) =>
        i === index ? newExamName : examName
      )
    );
  };
  const handleFeeChange = (index: number, key: string, newValue: string) => {
    const updatedFees: any = updatedFee.map((fee: any, i) => {
      if (i === index) {
        return { ...fee, [key]: newValue };
      }
      return fee;
    });

    setUpdatedFee(updatedFees); // Update state with modified fees
  };
  const handleSubmit = async () => {
    const feeObject = updatedFee?.reduce((acc: any, fee: any) => {
      acc[fee.name] = fee.value;
      return acc;
    }, {});

    const newData = {
      year,
      shift,
      class: classes,
      section,
      subject: subjects,
      fee: feeObject,
      examName: examNames,
    };
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/class/${id}`,
        newData
      );
      if (res.status === 200) {
        addSuccessfully("Successfully updated");
        setTimeout(() => {
          navigate(`/site-admin/student-class`);
        }, 2000);
      }
    } catch (error) {
      toastError("Something is wrong");
    }
  };

  const handleBack = () => {
    navigate("/site-admin/student-class");
  };
  console.log({ data });

  return (
    <div>
      <Container maxWidth="xl">
        <Paper
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <h3 className="dashboard_common_title">Edit Class</h3>
          <div>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Year
                </label>
                <input
                  type="text"
                  placeholder="add a year"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setYear(e.target.value)
                  }
                  defaultValue={year}
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Shift
                </label>
                <input
                  type="text"
                  placeholder="add a shift"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShift(e.target.value)
                  }
                  defaultValue={shift}
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Class
                </label>

                <input
                  type="text"
                  placeholder="add class name"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setClass(e.target.value)
                  }
                  defaultValue={classes}
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Section
                </label>
                <input
                  type="text"
                  placeholder="add a section"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSection(e.target.value)
                  }
                  defaultValue={section}
                />
              </Grid>
            </Grid>
            {subjects?.length > 0 && (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} lg={12} md={12}>
                  <h5 className="common_sub_title">Subject</h5>
                </Grid>
                {subjects?.map((item, index) => (
                  <Grid item xs={12} lg={4} md={4} key={item}>
                    <label htmlFor="" className="input_label">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="add subject"
                      className="text_field"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleSubjectChange(index, e.target.value)
                      }
                      defaultValue={item}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            {examNames?.length > 0 && (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} lg={12} md={12}>
                  <h5 className="common_sub_title">Exam Name</h5>
                </Grid>
                {examNames?.map((item, index) => (
                  <Grid item xs={12} lg={4} md={4} key={item}>
                    <label htmlFor="" className="input_label">
                      Exam Name
                    </label>
                    <input
                      type="text"
                      placeholder="add exam name"
                      className="text_field"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleExamNameChange(index, e.target.value)
                      }
                      defaultValue={item}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            {updatedFee?.length > 0 && (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} lg={12} md={12}>
                  <h5 className="common_sub_title">Fee</h5>
                </Grid>
                {updatedFee?.map((item: any, index: number) => (
                  <>
                    <Grid item xs={12} lg={6} md={6} key={item.name}>
                      <label htmlFor="" className="input_label">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="add a section"
                        className="text_field"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleFeeChange(index, "name", e.target.value)
                        }
                        defaultValue={item.name}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} key={item.value}>
                      <label htmlFor="" className="input_label">
                        Value
                      </label>
                      <input
                        type="text"
                        placeholder="add a section"
                        className="text_field"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleFeeChange(index, "value", e.target.value)
                        }
                        defaultValue={item.value}
                      />
                    </Grid>
                  </>
                ))}
              </Grid>
            )}
            <div className="dashboard_btn_container">
              <button className="submit_btn" onClick={handleBack}>
                Previous
              </button>
              <button className="submit_btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default EditClass;
