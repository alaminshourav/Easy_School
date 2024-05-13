import { Box, Container, Grid } from "@mui/material";
import "./Contact.css";
import { addSuccessfully, toastError } from "../../util/message";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<any>();
  const serviceId = import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.sendForm(serviceId, templateId, form?.current, publicKey).then(
      () => {
        addSuccessfully("Email send successfully");
        e.currentTarget.reset();
      },
      (error: any) => {
        toastError(error.text);
      }
    );
  };

  return (
    <div className="contact_us ">
      <Container maxWidth="xl" sx={{ pt: 10 }}>
        <Box className="heading_padding section_padding">
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
          >
            <Grid item xs={12} lg={6} md={6}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.95338886736!2d90.41968899999999!3d23.7808405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1711141573036!5m2!1sen!2sbd"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <form
                className="contact_us_form"
                onSubmit={handleSubmit}
                ref={form}
              >
                <div className="input_container_main">
                  <div className="input_container">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="name"
                    />
                  </div>
                </div>
                <div className="input_container_main">
                  <div className="input_container">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="">Phone</label>
                    <input
                      type="phone"
                      name="phone"
                      id="phone"
                      placeholder="+889"
                    />
                  </div>
                </div>
                <div className="input_container_main">
                  <textarea name="message" id="" rows={10}></textarea>
                </div>
                <div className="submit_btn_pages">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Contact;
