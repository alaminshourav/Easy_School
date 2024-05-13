import { Container, Grid, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";
import { TeacherType } from "../../../../../types/AdminProps.type";
import { addSuccessfully, toastError } from "../../../../../util/message";
import { AuthContext } from "../../../../../context/AuthContext";
import EditFileUpload from "../../../../../components/fileUpload/EditFIleUpload";

const EditTeacher = () => {
  const { id } = useParams();
  const { data } = useFetch<TeacherType>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee/${id}`
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
  const [initPhoto, setInitPhoto] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const teacherImageURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_TEACHER;

  useEffect(() => {
    data?.username && setUsername(data?.username);
    data?.phoneNumber && setPhoneNumber(data?.phoneNumber);
    data?.email && setEmail(data?.email);
    data?.birthDate && setBirthDate(data?.birthDate);
    data?.password && setPassword(data?.password);
    data?.gender && setGender(data?.gender);
    data?.passportID && setPassportID(data?.passportID);
    data?.nationalID && setNationalID(data?.nationalID);
    data?.maritalStatus && setMaritalStatus(data?.maritalStatus);
    data?.fatherName && setFatherName(data?.fatherName);
    data?.motherName && setMotherName(data?.motherName);
    data?.sscResult?.examination &&
      setSscExamination(data?.sscResult?.examination);
    data?.sscResult?.board && setHscBoard(data?.sscResult?.board);
    data?.sscResult?.group && setSscGroup(data?.sscResult?.group);
    data?.sscResult?.result && setSscResult(data?.sscResult?.result);
    data?.sscResult?.passingYear &&
      setSscPassingYear(data?.sscResult?.passingYear);
    data?.hscResult?.examination &&
      setHscExamination(data?.hscResult?.examination);
    data?.hscResult?.board && setHscBoard(data?.hscResult?.board);
    data?.hscResult?.group && setHscGroup(data?.hscResult?.group);
    data?.hscResult?.result && setHscResult(data?.hscResult?.result);
    data?.hscResult?.passingYear &&
      setHscPassingYear(data?.hscResult?.passingYear);
    data?.graduationResult?.examination &&
      setGraduationExamination(data?.graduationResult?.examination);
    data?.graduationResult?.board &&
      setGraduationBoard(data?.graduationResult?.board);
    data?.graduationResult?.group &&
      setGraduationGroup(data?.graduationResult?.group);
    data?.graduationResult?.result &&
      setGraduationResult(data?.graduationResult?.result);
    data?.graduationResult?.passingYear &&
      setGraduationPassingYear(data?.graduationResult?.passingYear);
    data?.mastersResult?.examination &&
      setMastersExamination(data?.mastersResult?.examination);
    data?.mastersResult?.board && setMastersBoard(data?.mastersResult?.board);
    data?.mastersResult?.group && setMastersGroup(data?.mastersResult?.group);
    data?.mastersResult?.result &&
      setMastersResult(data?.mastersResult?.result);
    data?.mastersResult?.passingYear &&
      setMastersPassingYear(data?.mastersResult?.passingYear);
    data?.experience?.company &&
      setExperienceCompanyName(data.experience.company);
    data?.experience?.year && setExperienceYear(data?.experience.year);
    data?.religion && setReligion(data?.religion);
    data?.nationality && setNationality(data?.nationality);
    data?.address && setAddress(data?.address);
    data?.birthRegistrationNo &&
      setBirthRegistrationNo(data?.birthRegistrationNo);
    data?.photo && setInitPhoto(data?.photo);
  }, [data]);
  const handleImage = (link: string | undefined, folder: string) => {
    try {
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/delete/${link}?${folder}=${folder}`
        )
        .then((res) => {
          if (res.status === 200) {
            addSuccessfully("Image Deleted Successfully");
            setInitPhoto("");
          }
        });
    } catch (error) {
      toastError("Something is wrong");
    }
  };
  const handleSubmit = async () => {
    const newData = {
      username,
      phoneNumber,
      email,
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
      photo: initPhoto,
    };

    if (files) {
      await Promise.all(
        Object.values(files).map(async (file) => {
          const imageData = new FormData();
          const fileName = Date.now() + file.name.replace(/\s+/g, "_");
          imageData.append("name", fileName);
          imageData.append("employee", file);
          try {
            const uploadRes = await axios.post(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/upload`,
              imageData
            );
            if (uploadRes.status === 201) {
              newData.photo = fileName;
              handleImage(data?.photo, "employee");
            }
          } catch (err) {
            console.log(err);
          }
        })
      );
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee/${id}`,
        newData
      );
      if (res.status === 200) {
        addSuccessfully("Successfully updated");
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
      console.log(error);
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
          <h3 className="dashboard_common_title">Edit Teacher</h3>

          <div>
            <EditFileUpload
              files={files}
              setFiles={setFiles}
              photo={data?.photo}
              pathName={teacherImageURL}
              folderName="teacher"
            />

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
                    defaultValue={username}
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
                    defaultValue={phoneNumber}
                    placeholder="phone number"
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
                    defaultValue={email}
                    placeholder="email"
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
                    defaultValue={password}
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
                    defaultValue={nationality}
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setReligion(e.target.value)
                    }
                    defaultValue={religion}
                    className="text_field"
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
                    defaultValue={gender}
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
                    defaultValue={nationalID}
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
                    defaultValue={birthRegistrationNo}
                    placeholder="birth registration"
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
                    defaultValue={passportID}
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
                    defaultValue={maritalStatus}
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
                    defaultValue={address}
                    placeholder="address"
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
                    defaultValue={fatherName}
                    placeholder="father name"
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
                    defaultValue={motherName}
                    placeholder="mother name"
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
                  defaultValue={sscExamination}
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
                  defaultValue={sscBoard}
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
                  defaultValue={sscGroup}
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
                  defaultValue={sscResult}
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
                  defaultValue={sscPassingYear}
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
                  defaultValue={hscExamination}
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
                  defaultValue={hscBoard}
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
                  defaultValue={hscGroup}
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
                  defaultValue={hscResult}
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
                  defaultValue={hscPassingYear}
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
                  defaultValue={graduationExamination}
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
                  defaultValue={graduationBoard}
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
                  defaultValue={graduationGroup}
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
                  defaultValue={graduationResult}
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
                  defaultValue={graduationPassingYear}
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
                  defaultValue={mastersExamination}
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
                  defaultValue={mastersBoard}
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
                  defaultValue={mastersGroup}
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
                  defaultValue={mastersResult}
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
                  defaultValue={mastersPassingYear}
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
                  defaultValue={experienceCompanyName}
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
                  defaultValue={experienceYear}
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

export default EditTeacher;
