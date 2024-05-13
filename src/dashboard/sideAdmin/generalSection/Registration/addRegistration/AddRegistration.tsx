import { Container, Grid, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import FileUpload from "../../../../../components/fileUpload/FileUpload";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "../../../../../hooks/useFetch";
import {
  ClassType,
  StudentType,
  TeacherType,
} from "../../../../../types/AdminProps.type";
import { addSuccessfully, toastError } from "../../../../../util/message";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../context/AuthContext";

const AddRegistration = () => {
  const { user } = useContext(AuthContext);
  const { data: classData } = useFetch<ClassType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class`
  );
  const { data: userData } = useFetch<StudentType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student`
  );
  const { data: employeeData } = useFetch<TeacherType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee`
  );
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [admissionType, setAdmissionType] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("student");
  const [gender, setGender] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [numberOfClassName, setNumberOfClassName] = useState("");
  const [parentNameFather, setParentNameFather] = useState("");
  const [parentNameMother, setParentNameMother] = useState("");
  const [occupationParentFather, setOccupationParentFather] = useState("");
  const [occupationParentMother, setOccupationParentMother] = useState("");
  const [contactDetailsFather, setContactDetailsFather] = useState("");
  const [contactDetailsMother, setContactDetailsMother] = useState("");
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
  const [registrationDate, setRegistrationData] = useState(new Date());
  const [fee, setFee] = useState({});
  const [feeArray, setFeeArray] = useState([]);
  const [waiver, setWaiver] = useState([]);
  const [shawWaiver, setShawWaiver] = useState(false);
  const [section, setSection] = useState("");
  const [shift, setShift] = useState("");
  const navigate = useNavigate();
  const [defaultClasses, setDefaultClasses] = useState([]);
  const [defaultSection, setDefaultSection] = useState([]);
  const [defaultShift, setDefaultShift] = useState([]);
  const { data } = useFetch<ClassType | null>(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/class/filter-class?className=${numberOfClassName}`
  );

  useEffect(() => {
    if (data?.fee) {
      data?.fee && setFee(data.fee);
    }
  }, [data]);

  useEffect(() => {
    if (fee) {
      const feeArray: any = Object.entries(fee).map(([name, value]) => ({
        name,
        value,
      }));
      setFeeArray(feeArray);
    }
  }, [fee]);

  useEffect(() => {
    //allClasses
    const allClasses = classData && classData?.map((item: any) => item.class);
    const uniqueClassSet = new Set(allClasses);
    const uniqueClassArray: any = Array.from(uniqueClassSet);

    //allClasses
    const allSection = classData && classData?.map((item: any) => item.section);
    const uniqueSectionSet = new Set(allSection);
    const uniqueSectionArray: any = Array.from(uniqueSectionSet);

    //allClasses
    const allShift = classData && classData?.map((item: any) => item.shift);
    const uniqueShiftSet = new Set(allShift);
    const uniqueShiftArray: any = Array.from(uniqueShiftSet);

    setDefaultClasses(uniqueClassArray);
    setDefaultSection(uniqueSectionArray);
    setDefaultShift(uniqueShiftArray);
  }, [classData]);

  const generateIdStudent = () => {
    const dataLength: any = (userData?.length || 0) + 1;
    let base;
    if (category === "student") {
      if (dataLength > 99) {
        base = 24;
      } else if (dataLength > 9) {
        base = 2400;
      } else {
        base = 24000;
      }
    }
    const newId = base + dataLength;

    return newId;
  };

  const generateIdEmployee = () => {
    const dataLength = (employeeData?.length || 0) + 1;
    let base;
    if (category === "employee") {
      if (dataLength > 99) {
        base = 24;
      } else if (dataLength > 9) {
        base = 240;
      } else {
        base = 2400;
      }
    } else {
      throw new Error("Category must be 'employee'");
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
    const userId =
      category === "student" ? generateIdStudent() : generateIdEmployee();
    const newData = {
      username,
      phoneNumber,
      email,
      userId,
      employeeId: userId,
      birthDate,
      password,
      gender,
      rollNumber,
      section,
      shift,
      class: numberOfClassName,
      religion,
      nationality,
      address,
      birthRegistrationNo,
      passportID,
      maritalStatus,
      fatherName,
      motherName,
      nationalID,
      registrationDate,
      parentDetailsFather: {
        name: parentNameFather,
        occupation: occupationParentFather,
        contactDetails: contactDetailsFather,
      },
      parentDetailsMother: {
        name: parentNameMother,
        occupation: occupationParentMother,
        contactDetails: contactDetailsMother,
      },
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
      admissionType,
      waiver,
      registrationNumber,
    };

    if (category === "student") {
      if (files) {
        await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            const fileName = Date.now() + file.name.replace(/\s+/g, "_");
            data.append("name", fileName);
            data.append("student", file);
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
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/student`,
            newData
          );

          if (res.status === 201) {
            addSuccessfully("successfully added");
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
      }
    } else {
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
    }
  };

  const handleFeeChange = (index: number, newValue: string) => {
    const updatedFees: any = feeArray.map((fee: any, i) => {
      if (i === index) {
        return { ...fee, value: newValue };
      }
      return fee;
    });
    setFeeArray(updatedFees);
    const updatedWaiver = updatedFees.reduce((acc: any, fee: any) => {
      acc[fee.name] = fee.value;
      return acc;
    }, {});

    setWaiver(updatedWaiver);
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
          {category === "student" ? (
            <h3 className="dashboard_common_title">Student Registration</h3>
          ) : (
            <h3 className="dashboard_common_title">Employee Registration</h3>
          )}
          <div className="selector">
            <label htmlFor="" className="input_label">
              Category
            </label>
            <select
              name=""
              id=""
              className="text_field"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCategory(e.target.value)
              }
              value={category}
            >
              <option selected disabled>
                Please a category
              </option>
              <option value={"student"}>Student</option>
              <option value={"employee"}>New Employee</option>
            </select>
          </div>
          <div>
            <FileUpload files={files} setFiles={setFiles} />
            {category === "student" ? (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Admission Type
                  </label>
                  <select
                    name=""
                    id=""
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setAdmissionType(e.target.value)
                    }
                    className="text_field"
                    required
                  >
                    <option selected disabled>
                      Please select
                    </option>
                    <option value="Admission">New Admission</option>
                    <option value="Re-Admission">Re-Admission</option>
                  </select>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Class
                  </label>
                  <select
                    name=""
                    id=""
                    className="text_field"
                    onChange={(e) => setNumberOfClassName(e.target.value)}
                    required
                  >
                    <option disabled selected>
                      Please Select
                    </option>
                    {defaultClasses?.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Section
                  </label>
                  <select
                    name=""
                    id=""
                    className="text_field"
                    onChange={(e) => setSection(e.target.value)}
                    required
                  >
                    <option disabled selected>
                      Please Select
                    </option>
                    {defaultSection?.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Shift
                  </label>
                  <select
                    name=""
                    id=""
                    className="text_field"
                    onChange={(e) => setShift(e.target.value)}
                    required
                  >
                    <option disabled selected>
                      Please Select
                    </option>
                    {defaultShift?.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    User Name
                  </label>
                  <input
                    type="text"
                    placeholder="user name"
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
                    Password
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    value={password}
                    placeholder="password"
                    required
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
                    className="text_field"
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
                    Nationality
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="nationality"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNationality(e.target.value)
                    }
                    value={nationality}
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
                    Roll Number
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="roll number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRollNumber(e.target.value)
                    }
                    value={rollNumber}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="registration number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationNumber(e.target.value)
                    }
                    value={registrationNumber}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Birth Registration No
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="birth registration no"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBirthRegistrationNo(e.target.value)
                    }
                    value={birthRegistrationNo}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="address"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAddress(e.target.value)
                    }
                    value={address}
                    required
                  />
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
                    Parent Name Father
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="parent name father"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setParentNameFather(e.target.value)
                    }
                    required
                    value={parentNameFather}
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Occupation Parent Father
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="occupation parent father"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setOccupationParentFather(e.target.value)
                    }
                    required
                    value={occupationParentFather}
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Contact Details Father
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="contact details father"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContactDetailsFather(e.target.value)
                    }
                    required
                    value={contactDetailsFather}
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Parent Name Mother
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="parent name mother"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setParentNameMother(e.target.value)
                    }
                    required
                    value={parentNameMother}
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Occupation Parent Mother
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="occupation parent mother"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setOccupationParentMother(e.target.value)
                    }
                    required
                    value={occupationParentMother}
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Contact Details Mother
                  </label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder="contact details mother"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContactDetailsMother(e.target.value)
                    }
                    required
                    value={contactDetailsMother}
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <label htmlFor="" className="input_label">
                    Registration Date
                  </label>
                  <DatePicker
                    className="text_field"
                    selected={registrationDate}
                    onChange={(date: any) => setRegistrationData(date)}
                    required
                  />
                </Grid>
                {numberOfClassName && (
                  <Grid item xs={12} lg={12} md={12}>
                    <button
                      className="submit_btn"
                      onClick={() => setShawWaiver((prev) => !prev)}
                    >
                      Add Waiver
                    </button>
                  </Grid>
                )}
                {shawWaiver && (
                  <>
                    {feeArray?.map((item: any, index) => (
                      <Grid item xs={12} lg={6} md={6} key={index}>
                        <label className="input_label">{item.name}</label>
                        <input
                          type="text"
                          className="text_field"
                          placeholder={`Enter new value for ${item.name}`}
                          onChange={(e) =>
                            handleFeeChange(index, e.target.value)
                          }
                        />
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            ) : (
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
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
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
                  <p className="teacher_level_title">
                    Masters/Equivalent Level
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

export default AddRegistration;
