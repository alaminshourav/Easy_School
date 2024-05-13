import { Container, Grid, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import FileUpload from "../../../../../components/fileUpload/FileUpload";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "../../../../../hooks/useFetch";
import { ClassType, StudentType } from "../../../../../types/AdminProps.type";
import { addSuccessfully, toastError } from "../../../../../util/message";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../context/AuthContext";

const AddStudent = () => {
  const { user } = useContext(AuthContext);
  const { data: classData } = useFetch<ClassType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class`
  );
  const { data: userData } = useFetch<StudentType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student`
  );
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [admissionType, setAdmissionType] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
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
    const allClasses = classData && classData?.map((item) => item.class);
    const uniqueClassSet = new Set(allClasses);
    const uniqueClassArray: any = Array.from(uniqueClassSet);

    //allClasses
    const allSection = classData && classData?.map((item) => item.section);
    const uniqueSectionSet = new Set(allSection);
    const uniqueSectionArray: any = Array.from(uniqueSectionSet);

    //allClasses
    const allShift = classData && classData?.map((item) => item.shift);
    const uniqueShiftSet = new Set(allShift);
    const uniqueShiftArray: any = Array.from(uniqueShiftSet);

    setDefaultClasses(uniqueClassArray);
    setDefaultSection(uniqueSectionArray);
    setDefaultShift(uniqueShiftArray);
  }, [classData]);

  const generateIdStudent = () => {
    const dataLength: any = (userData?.length || 0) + 1;
    let base;

    if (dataLength > 99) {
      base = 24;
    } else if (dataLength > 9) {
      base = 2400;
    } else {
      base = 24000;
    }
    const newId = base + dataLength;

    return newId;
  };

  const handleSubmit = async () => {
    const userId = generateIdStudent();
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
      photo: "",
      admissionType,
      waiver,
      registrationNumber,
    };

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
          <h3 className="dashboard_common_title">Student Registration</h3>
          <div>
            <FileUpload files={files} setFiles={setFiles} />
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
                        onChange={(e) => handleFeeChange(index, e.target.value)}
                      />
                    </Grid>
                  ))}
                </>
              )}
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

export default AddStudent;
