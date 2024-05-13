import { Container, Grid, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";
import { ClassType, StudentType } from "../../../../../types/AdminProps.type";
import EditFileUpload from "../../../../../components/fileUpload/EditFIleUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addSuccessfully, toastError } from "../../../../../util/message";
import { AuthContext } from "../../../../../context/AuthContext";

const EditStudent = () => {
  const { id } = useParams();
  const { data } = useFetch<StudentType>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student/${id}`
  );
  const studentImageURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_STUDENT;

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
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
  const [initPhoto, setInitPhoto] = useState("");
  const [registrationDate, setRegistrationData] = useState(new Date());
  const [fee, setFee] = useState({});
  const [feeArray, setFeeArray] = useState([]);
  const [waiver, setWaiver] = useState([]);
  const [section, setSection] = useState("");
  const [shift, setShift] = useState("");
  const [initWaiver, setInitWaiver] = useState(null);
  const [admissionType, setAdmissionType] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { data: classData } = useFetch<ClassType | null>(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/class/filter-class?className=${numberOfClassName}`
  );

  useEffect(() => {
    classData?.fee && setFee(classData.fee);
  }, [classData]);

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
    data?.username && setUsername(data?.username);
    data?.phoneNumber && setPhoneNumber(data?.phoneNumber);
    data?.email && setEmail(data?.email);
    data?.birthDate && setBirthDate(data?.birthDate);
    data?.password && setPassword(data?.password);
    data?.gender && setGender(data?.gender);
    data?.section && setSection(data?.section);
    data?.shift && setShift(data?.shift);
    data?.rollNumber && setRollNumber(data?.rollNumber);
    data?.admissionType && setAdmissionType(data?.admissionType);
    data?.waiver && setInitWaiver(data?.waiver);
    data?.registrationNumber && setRegistrationNumber(data?.registrationNumber);
    data?.class && setNumberOfClassName(data?.class);
    data?.parentDetailsFather?.name &&
      setParentNameFather(data?.parentDetailsFather?.name);
    data?.parentDetailsFather?.occupation &&
      setOccupationParentFather(data?.parentDetailsFather?.occupation);
    data?.parentDetailsFather?.contactDetails &&
      setContactDetailsFather(data?.parentDetailsFather?.contactDetails);
    data?.parentDetailsMother?.name &&
      setParentNameMother(data?.parentDetailsMother?.name);
    data?.parentDetailsMother?.occupation &&
      setOccupationParentMother(data?.parentDetailsMother?.occupation);
    data?.parentDetailsMother?.contactDetails &&
      setContactDetailsMother(data?.parentDetailsMother?.contactDetails);
    data?.religion && setReligion(data?.religion);
    data?.nationality && setNationality(data?.nationality);
    data?.address && setAddress(data?.address);
    data?.registrationData && setRegistrationData(data?.registrationData);
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
      rollNumber,
      registrationNumber,
      class: numberOfClassName,
      religion,
      nationality,
      address,
      section,
      shift,
      admissionType,
      birthRegistrationNo,
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
      photo: initPhoto,
      registrationDate,
      waiver: waiver ? waiver : initWaiver,
    };
    if (files) {
      await Promise.all(
        Object.values(files).map(async (file) => {
          const imageData = new FormData();
          const fileName = Date.now() + file.name.replace(/\s+/g, "_");
          imageData.append("name", fileName);
          imageData.append("student", file);
          try {
            const uploadRes = await axios.post(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/upload`,
              imageData
            );
            if (uploadRes.status === 201) {
              newData.photo = fileName;
              handleImage(data?.photo, "student");
            }
          } catch (err) {
            console.log(err);
          }
        })
      );
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/student/${id}`,
        newData
      );

      if (res.status === 200) {
        addSuccessfully("successfully updated");
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
          <h3 className="dashboard_common_title">Edit Student</h3>

          <div>
            <EditFileUpload
              files={files}
              setFiles={setFiles}
              photo={data?.photo}
              pathName={studentImageURL}
              folderName="student"
            />

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
                  value={admissionType}
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
                  defaultValue={numberOfClassName}
                >
                  <option disabled selected>
                    Please Select
                  </option>
                  <option value={classData?.class}>{classData?.class}</option>
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
                  defaultValue={section}
                >
                  <option disabled selected>
                    Please Select
                  </option>
                  <option value={classData?.section}>
                    {classData?.section}
                  </option>
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
                  defaultValue={shift}
                >
                  <option disabled selected>
                    Please Select
                  </option>
                  <option value={classData?.shift}>{classData?.shift}</option>
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
                  Nationality
                </label>
                <input
                  type="text"
                  className="text_field"
                  placeholder="nationality"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNationality(e.target.value)
                  }
                  defaultValue={nationality}
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
                  defaultValue={birthDate}
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
                  defaultValue={rollNumber}
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
                  defaultValue={registrationNumber}
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
                  defaultValue={birthRegistrationNo}
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
                  defaultValue={address}
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Class
                </label>
                <input
                  type="text"
                  className="text_field"
                  placeholder="add a class"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNumberOfClassName(e.target.value)
                  }
                  defaultValue={numberOfClassName}
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
                  Parent Name Father
                </label>
                <input
                  type="text"
                  className="text_field"
                  placeholder="parent name father"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setParentNameFather(e.target.value)
                  }
                  defaultValue={parentNameFather}
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
                  defaultValue={occupationParentFather}
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
                  defaultValue={contactDetailsFather}
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
                  defaultValue={parentNameMother}
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
                  defaultValue={occupationParentMother}
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
                  defaultValue={contactDetailsMother}
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
                />
              </Grid>
              {numberOfClassName && (
                <Grid item xs={12} lg={12} md={12}>
                  <div style={{ margin: "20px 0" }}>
                    <label className="input_label">Waiver</label>
                  </div>
                </Grid>
              )}

              {feeArray?.map((item: any, index) => (
                <Grid item xs={12} lg={4} md={4} key={index}>
                  <label className="input_label">{item.name}</label>
                  <input
                    type="text"
                    className="text_field"
                    placeholder={`Enter new value for ${item.name}`}
                    onChange={(e) => handleFeeChange(index, e.target.value)}
                    defaultValue={data ? data?.waiver[item?.name] : ""}
                  />
                </Grid>
              ))}
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

export default EditStudent;
