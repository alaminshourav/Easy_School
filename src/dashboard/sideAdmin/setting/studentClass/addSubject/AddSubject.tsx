import { Container, Grid, Paper } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useFetch from "../../../../../hooks/useFetch";
import { ClassType } from "../../../../../types/AdminProps.type";
import { addSuccessfully, toastError } from "../../../../../util/message";
import DeleteIcon from "@mui/icons-material/Delete";

const AddSubject = () => {
  const { id } = useParams();
  const { data } = useFetch<ClassType>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class/${id}`
  );
  const [inputListForSubject, setInputListForSubject] = useState([1]);
  const [inputListForFee, setInputListForFee] = useState([1]);
  const [inputListForExam, setInputListForExam] = useState([1]);
  const [previousSubjectData, setPreviousSubjectData] = useState([]);
  const [previousFeeData, setPreviousFeeData] = useState({});
  const [previousExamData, setPreviousExamData] = useState([]);
  const [updatedFee, setUpdatedFee] = useState([]);
  const formSubjectRef = useRef<HTMLFormElement | null>(null);
  const formFeeRef = useRef<HTMLFormElement | null>(null);
  const formExamRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    data?.subject && setPreviousSubjectData(data?.subject);
    data?.fee && setPreviousFeeData(data?.fee);
    data?.examName && setPreviousExamData(data?.examName);
  }, [data]);
  useEffect(() => {
    if (previousFeeData) {
      const feeArray: any = Object.entries(previousFeeData).map(
        ([name, value]) => ({
          name,
          value,
        })
      );

      setUpdatedFee(feeArray);
    }
  }, [previousFeeData]);
  const handleSubject = () => {
    const newData = inputListForSubject.length;
    setInputListForSubject((pre) => [...pre, newData + 1]);
  };
  const handleFeeCategory = () => {
    const newData = inputListForFee.length;
    setInputListForFee((pre) => [...pre, newData + 1]);
  };
  const handleExam = () => {
    const newData = inputListForExam.length;
    setInputListForExam((pre) => [...pre, newData + 1]);
  };

  const handleSubmit = async () => {
    let subjectData: any = [];
    if (formSubjectRef.current) {
      const formSubjectData = new FormData(formSubjectRef.current);
      for (let pair of formSubjectData.entries()) {
        if (pair[1] !== "") {
          subjectData.push(pair[1]);
        }
      }
    }
    let examData: any = [];
    if (formExamRef.current) {
      const formExamData = new FormData(formExamRef.current);
      for (let pair of formExamData.entries()) {
        if (pair[1] !== "") {
          examData.push(pair[1]);
        }
      }
    }
    let feeObj: any = {};
    let feeData: any = [];
    if (formFeeRef.current) {
      const formFeeData = new FormData(formFeeRef.current);
      for (let pair of formFeeData.entries()) {
        if (pair[1] !== "") {
          feeData.push(pair[1]);
        }
      }
      feeData.forEach((item: any, i: number) => {
        if (i % 2 === 0) {
          const obj = {
            [item]: feeData[i + 1],
          };
          console.log(obj);

          feeObj[item] = feeData[i + 1];
        }
      });
    }

    const classSubject = {
      subject: [...previousSubjectData, ...subjectData],
      fee: { ...previousFeeData, ...feeObj },
      examName: [...previousExamData, ...examData],
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/class/${id}`,
        classSubject
      );

      if (res.status === 200) {
        addSuccessfully("Successfully Added");
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
  const handleDelete = (i: number, whichOne: any) => {
    if (whichOne === "subject") {
      const filterInputListSubject = inputListForSubject?.filter(
        (_item, index) => index !== i
      );
      setInputListForSubject(filterInputListSubject);
    } else if (whichOne === "fee") {
      const filterInputListFee = inputListForFee?.filter(
        (_item, index) => index !== i
      );
      setInputListForFee(filterInputListFee);
    } else if (whichOne === "exam") {
      const filterInputListExam = inputListForExam?.filter(
        (_item, index) => index !== i
      );
      setInputListForExam(filterInputListExam);
    }
  };
  return (
    <div>
      <Container maxWidth="xl">
        <Paper
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          {(previousSubjectData.length > 0 ||
            updatedFee.length > 0 ||
            previousExamData.length > 0) && (
            <div>
              <h3 className="dashboard_common_title">
                Previous Subject And Fee
              </h3>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} lg={4} md={4}>
                  <h3 className=" border_bottom">Subject</h3>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <h3 className=" border_bottom">Fee Category</h3>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <h3 className=" border_bottom">Exam Name</h3>
                </Grid>
              </Grid>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} lg={4} md={4}>
                  <div className="previous_sub_card">
                    {previousSubjectData.map((item) => (
                      <p>{item}</p>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <div className="previous_sub_card">
                    {updatedFee?.map((item: any) => (
                      <div className="previous_fee">
                        <p>{item?.name}</p>
                        <p>{item?.value}</p>
                      </div>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <div className="previous_sub_card">
                    {previousExamData.map((item) => (
                      <p style={{ paddingBottom: "5px" }}>{item}</p>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </div>
          )}

          <hr style={{ margin: "30px 0" }} />
          <h3 className="dashboard_common_title">Add Subject And Fee</h3>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} lg={3} md={3}>
              <h3 className="dashboard_common_title">Subject</h3>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <h3 className="dashboard_common_title">Fee Category</h3>
            </Grid>
            <Grid item xs={12} lg={3} md={3}>
              <h3 className="dashboard_common_title">Exam Name</h3>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} lg={3} md={3}>
              <span className="add_icon" onClick={handleSubject}>
                <AddCircleOutlineIcon />
              </span>
              <form ref={formSubjectRef}>
                {inputListForSubject.map((item, i) => (
                  <div className="subject_input_container" key={item}>
                    <input
                      name={"Sub"}
                      type="text"
                      placeholder=""
                      className="text_field"
                    />
                    {i > 0 && (
                      <span
                        className="delete_icon"
                        onClick={() => handleDelete(i, "subject")}
                      >
                        <DeleteIcon />
                      </span>
                    )}
                  </div>
                ))}
              </form>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <span className="add_icon" onClick={handleFeeCategory}>
                <AddCircleOutlineIcon />
              </span>
              <form ref={formFeeRef}>
                {inputListForFee.map((item, i) => (
                  <div className="fee_input_main" key={item + "fee"}>
                    <div className="subject_input_container">
                      <input
                        type="text"
                        placeholder="name"
                        className="text_field"
                        name="name"
                      />
                    </div>
                    <div className="subject_input_container">
                      <input
                        type="text"
                        placeholder="amount"
                        className="text_field"
                        name="value"
                      />
                      {i > 0 && (
                        <span
                          className="delete_icon"
                          onClick={() => handleDelete(i, "fee")}
                        >
                          <DeleteIcon />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </form>
            </Grid>
            <Grid item xs={12} lg={3} md={3}>
              <span className="add_icon" onClick={handleExam}>
                <AddCircleOutlineIcon />
              </span>
              <form ref={formExamRef}>
                {inputListForExam.map((item, i) => (
                  <div className="fee_input_main" key={item + "fee"}>
                    <div className="subject_input_container">
                      <input
                        type="text"
                        placeholder="exam name"
                        className="text_field"
                        name="name"
                      />
                      {i > 0 && (
                        <span
                          className="delete_icon"
                          onClick={() => handleDelete(i, "exam")}
                        >
                          <DeleteIcon />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </form>
            </Grid>
          </Grid>
          <div className="dashboard_btn_container">
            <button className="submit_btn" onClick={handleBack}>
              Previous
            </button>
            <button className="submit_btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default AddSubject;
