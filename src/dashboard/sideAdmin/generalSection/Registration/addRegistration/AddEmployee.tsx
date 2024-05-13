import { Container, Grid, Paper } from "@mui/material";
import { useContext, useState } from "react";
import FileUpload from "../../../../../components/fileUpload/FileUpload";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "../../../../../hooks/useFetch";
import { TeacherType } from "../../../../../types/AdminProps.type";
import { addSuccessfully, toastError } from "../../../../../util/message";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../context/AuthContext";

const AddEmployee = () => {
  const { user } = useContext(AuthContext);
  const { data: employeeData } = useFetch<TeacherType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee`
  );
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [birthRegistrationNo, setBirthRegistrationNo] = useState("");
  const [passportID, setPassportID] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [sscExamination, setSscExamination] = useState("");
  const [sscBoard, setSscBoard] = useState("");
  const [sscGroup, setSscGroup] = useState("");
  const [sscResult, setSscResult] = useState("");
  const [sscPassingYear, setSscPassingYear] = useState("");
  const [hscExamination, setHscExamination] = useState("");
  const [hscBoard, setHscBoard] = useState("");
  const [hscGroup, setHscGroup] = useState("");
  const [hscResult, setHscResult] = useState("");
  const [hscPassingYear, setHscPassingYear] = useState("");
  const [graduationExamination, setGraduationExamination] = useState("");
  const [graduationBoard, setGraduationBoard] = useState("");
  const [graduationGroup, setGraduationGroup] = useState("");
  const [graduationResult, setGraduationResult] = useState("");
  const [graduationPassingYear, setGraduationPassingYear] = useState("");
  const [mastersExamination, setMastersExamination] = useState("");
  const [mastersBoard, setMastersBoard] = useState("");
  const [mastersGroup, setMastersGroup] = useState("");
  const [mastersResult, setMastersResult] = useState("");
  const [mastersPassingYear, setMastersPassingYear] = useState("");
  const [experienceCompanyName, setExperienceCompanyName] = useState("");
  const [experienceYear, setExperienceYear] = useState("");
  const [files, setFiles] = useState<File[] | null>(null);
  const navigate = useNavigate();

  const generateIdEmployee = () => {
    const dataLength = (employeeData?.length || 0) + 1;
    let base;

    if (dataLength > 99) {
      base = 24;
    } else if (dataLength > 9) {
      base = 240;
    } else {
      base = 2400;
    }

    if (typeof base !== "number") {
      throw new Error("Base is not a number");
    }

    const newId = base + dataLength;

    if (isNaN(newId)) {
      throw new Error("Generated ID is NaN");
    }

    return newId;
  };

  const handleSubmit = async () => {
    const userId = generateIdEmployee();
    const newData = {
      username,
      phoneNumber,
      email,
      employeeId: userId,
      birthDate,
      password,
      gender,
      religion,
      nationality,
      address,
      birthRegistrationNo,
      passportID,
      maritalStatus,
      fatherName,
      motherName,
      nationalID,
      experience: {
        year: experienceYear,
        company: experienceCompanyName,
      },
      sscResult: {
        examination: sscExamination,
        board: sscBoard,
        group: sscGroup,
        result: sscResult,
        passingYear: sscPassingYear,
      },
      hscResult: {
        examination: hscExamination,
        board: hscBoard,
        group: hscGroup,
        result: hscResult,
        passingYear: hscPassingYear,
      },
      graduationResult: {
        examination: graduationExamination,
        board: graduationBoard,
        group: graduationGroup,
        result: graduationResult,
        passingYear: graduationPassingYear,
      },
      mastersResult: {
        examination: mastersExamination,
        board: mastersBoard,
        group: mastersGroup,
        result: mastersResult,
        passingYear: mastersPassingYear,
      },
      photo: "",
    };

    if (files) {
      await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          const fileName = Date.now() + file.name.replace(/\s+/g, "_");
          data.append("name", fileName);
          data.append("employee", file);
          try {
            const uploadRes = await axios.post(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/upload`,
              data
            );
            if (uploadRes.status === 201) {
              newData.photo = fileName;
            }
          } catch (err) {
            console.log(err);
          }
        })
      );
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee`,
        newData
      );
      if (res.status === 201) {
        addSuccessfully("Successfully added");
        if (user?.role === "admin") {
          setTimeout(() => {
            navigate("/site-admin/registration");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/office-admin/registration");
          }, 2000);
        }
      }
    } catch (error) {
      toastError("Something is wrong");
    }
  };

  const handleBack = () => {
    if (user?.role === "admin") {
      navigate("/site-admin/registration");
    } else {
      navigate("/office-admin/registration");
    }
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Paper
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <h3 className="dashboard_common_title">Employee Registration</h3>
          <div>
            <FileUpload files={files} setFiles={setFiles} />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {/* Teacher input */}
              <>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="teacher name"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUsername(e.target.value)
                    }
                    value={username}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPhoneNumber(e.target.value)
                    }
                    value={phoneNumber}
                    placeholder="phone number"
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    value={email}
                    placeholder="email"
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBirthDate(e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    value={password}
                    required
                    placeholder="password"
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Nationality
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNationality(e.target.value)
                    }
                    value={nationality}
                    placeholder="nationality"
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Religion
                  </label>
                  <select
                    name=""
                    id=""
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setReligion(e.target.value)
                    }
                    required
                  >
                    <option disabled selected>
                      Please select
                    </option>
                    <option value="Muslim">Muslim</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Christian">Christian</option>
                    <option value="Others">Others</option>
                  </select>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Gender
                  </label>
                  <select
                    name=""
                    id=""
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setGender(e.target.value)
                    }
                    required
                  >
                    <option disabled selected>
                      Please select
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    National ID
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNationalID(e.target.value)
                    }
                    value={nationalID}
                    placeholder="national ID"
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Birth Registration
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBirthRegistrationNo(e.target.value)
                    }
                    value={birthRegistrationNo}
                    placeholder="birth registration"
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Passport ID
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassportID(e.target.value)
                    }
                    value={passportID}
                    placeholder="passport ID"
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Marital Status
                  </label>

                  <select
                    name=""
                    id=""
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setMaritalStatus(e.target.value)
                    }
                    required
                  >
                    <option disabled selected>
                      Please select
                    </option>
                    <option value="Married">Married</option>
                    <option value="Unmarried">Unmarried</option>
                  </select>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAddress(e.target.value)
                    }
                    value={address}
                    placeholder="address"
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Father Name
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFatherName(e.target.value)
                    }
                    value={fatherName}
                    placeholder="father name"
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Mother Name
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMotherName(e.target.value)
                    }
                    value={motherName}
                    placeholder="mother name"
                    required
                  />
                </Grid>
              </>
              {/* start SSC input */}
              <Grid item xs={12} lg={12} md={12}>
                <p className="teacher_level_title">SSC/Equivalent Level</p>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Examination
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSscExamination(e.target.value)
                  }
                  value={sscExamination}
                  placeholder="examination"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Board
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSscBoard(e.target.value)
                  }
                  value={sscBoard}
                  placeholder="board"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Group
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSscGroup(e.target.value)
                  }
                  value={sscGroup}
                  placeholder="group"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Result
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSscResult(e.target.value)
                  }
                  value={sscResult}
                  placeholder="result"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Passing Year
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSscPassingYear(e.target.value)
                  }
                  value={sscPassingYear}
                  placeholder="passing year"
                />
              </Grid>
              {/* end SSC input */}

              {/* start HSC input */}
              <Grid item xs={12} lg={12} md={12}>
                <p className="teacher_level_title">HSC/Equivalent Level</p>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Examination
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHscExamination(e.target.value)
                  }
                  value={hscExamination}
                  placeholder="examination"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Board
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHscBoard(e.target.value)
                  }
                  value={hscBoard}
                  placeholder="board"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Group
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHscGroup(e.target.value)
                  }
                  value={hscGroup}
                  placeholder="group"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Result
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHscResult(e.target.value)
                  }
                  value={hscResult}
                  placeholder="result"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Passing Year
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHscPassingYear(e.target.value)
                  }
                  value={hscPassingYear}
                  placeholder="passing year"
                />
              </Grid>
              {/* end HSC input */}

              {/* start Graduation input */}
              <Grid item xs={12} lg={12} md={12}>
                <p className="teacher_level_title">
                  Graduation/Equivalent Level
                </p>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Examination
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGraduationExamination(e.target.value)
                  }
                  value={graduationExamination}
                  placeholder="examination"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Board
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGraduationBoard(e.target.value)
                  }
                  value={graduationBoard}
                  placeholder="board"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Group
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGraduationGroup(e.target.value)
                  }
                  value={graduationGroup}
                  placeholder="group"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Result
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGraduationResult(e.target.value)
                  }
                  value={graduationResult}
                  placeholder="result"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Passing Year
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGraduationPassingYear(e.target.value)
                  }
                  value={graduationPassingYear}
                  placeholder="passing year"
                />
              </Grid>
              {/* end Graduation input */}

              {/* start Masters input */}
              <Grid item xs={12} lg={12} md={12}>
                <p className="teacher_level_title">Masters/Equivalent Level</p>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Examination
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMastersExamination(e.target.value)
                  }
                  value={mastersExamination}
                  placeholder="examination"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Board
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMastersBoard(e.target.value)
                  }
                  value={mastersBoard}
                  placeholder="board"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Group
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMastersGroup(e.target.value)
                  }
                  value={mastersGroup}
                  placeholder="group"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Result
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMastersResult(e.target.value)
                  }
                  value={mastersResult}
                  placeholder="result"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Passing Year
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMastersPassingYear(e.target.value)
                  }
                  value={mastersPassingYear}
                  placeholder="passing year"
                />
              </Grid>
              {/* end Masters input */}
              {/* start Masters input */}
              <Grid item xs={12} lg={12} md={12}>
                <p className="teacher_level_title">Experience (Optional)</p>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  School Name / Company Name
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setExperienceCompanyName(e.target.value)
                  }
                  value={experienceCompanyName}
                  placeholder="examination"
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  How many year
                </label>
                <input
                  type="text"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setExperienceYear(e.target.value)
                  }
                  value={experienceYear}
                  placeholder="year"
                />
              </Grid>

              {/* end Masters input */}
            </Grid>
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

export default AddEmployee;
