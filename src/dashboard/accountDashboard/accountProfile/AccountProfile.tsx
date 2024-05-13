import { Box, Container, Grid, Paper, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Loader from "../../../components/loader/Loader";
import useFetch from "../../../hooks/useFetch";
import { TeacherType } from "../../../types/AdminProps.type";
import { addSuccessfully, toastError } from "../../../util/message";
import axios from "axios";

const AccountProfile = () => {
  const { user } = useContext(AuthContext);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:650px)");
  const userImageUrl = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_TEACHER;
  const { data: employeeData, loading } = useFetch<TeacherType | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee/${user?._id}`
  );

  useEffect(() => {
    employeeData?.username && setUsername(employeeData.username);
    employeeData?.email && setEmail(employeeData.email);
    employeeData?.password && setPassword(employeeData.password);
    employeeData?.address && setAddress(employeeData.address);
    employeeData?.phoneNumber && setPhoneNumber(employeeData.phoneNumber);
  }, [employeeData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = {
      userName,
      email,
      password,
      address,
      phoneNumber,
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee/${
          employeeData?._id
        }`,
        newData
      );

      if (res.status === 200) {
        addSuccessfully("successfully updated");
        setIsDisabled(true);
      }
    } catch (error) {
      toastError("Something is wrong");
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth={"xl"}>
          <Paper
            className="dashboard_container_form"
            style={{ marginTop: "120px" }}
          >
            <Box className="main_profile">
              <form action="" onSubmit={handleSubmit}>
                <Grid
                  sx={{
                    flexDirection: isSmallScreen ? "column-reverse" : "row",
                  }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12} lg={8} md={8}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12} lg={6} md={6}>
                        <div className="user_info">
                          <label htmlFor="" className="input_label">
                            Full Name
                          </label>
                          <input
                            type="text"
                            placeholder="name"
                            className="text_field"
                            defaultValue={employeeData?.username}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(e.target.value)}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={6} md={6}>
                        <div className="user_info">
                          <label htmlFor="" className="input_label">
                            Email
                          </label>
                          <input
                            type="text"
                            placeholder="email"
                            className="text_field"
                            defaultValue={employeeData?.email}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setEmail(e.target.value)}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={6} md={6}>
                        <div className="user_info">
                          <label htmlFor="" className="input_label">
                            Address
                          </label>
                          <input
                            type="text"
                            placeholder="password"
                            className="text_field"
                            defaultValue={employeeData?.address}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setAddress(e.target.value)}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={6} md={6}>
                        <div className="user_info">
                          <label htmlFor="" className="input_label">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            placeholder="password"
                            className="text_field"
                            defaultValue={employeeData?.phoneNumber}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} lg={12} md={12}>
                        <div className="user_info">
                          <label htmlFor="" className="input_label">
                            Password
                          </label>
                          <input
                            type="text"
                            placeholder="password"
                            className="text_field"
                            defaultValue={employeeData?.password}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(e.target.value)}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={4} md={4}>
                    <div className="user_photo">
                      <img src={userImageUrl + user?.photo} alt="" />
                    </div>
                  </Grid>
                </Grid>
                <div>
                  <button disabled={isDisabled} className="submit_btn">
                    Submit
                  </button>
                </div>
              </form>
            </Box>
          </Paper>
        </Container>
      )}
    </div>
  );
};

export default AccountProfile;
