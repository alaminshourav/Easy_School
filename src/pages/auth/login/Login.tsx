import { Container, Grid } from "@mui/material";
import image1 from "../../../assets/auth_bg/auth_page_bg.jpg";
import "./login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { toastError } from "../../../util/message";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { loading, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = {
      userId,
      password,
    };
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/login`,
        newData
      );
      localStorage.setItem("user", res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error: any) {
      toastError(error?.response?.data);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="contact_us ">
      <Container maxWidth="xl" className="" sx={{ pt: 4, pb: 2 }}>
        <Grid
          container
          rowSpacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
        >
          <Grid item xs={12} lg={6} md={6}>
            <div className="auth_image">
              <img src={image1} alt="" />
            </div>
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <form
              className="contact_us_form login_page_input"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className="input_container_main">
                <div className="input_container">
                  <label htmlFor="">Login Id</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Your id number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserId(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="input_container_main">
                <div className="input_container">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="submit_btn_pages">
                <div>
                  <button type="submit" disabled={loading}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
