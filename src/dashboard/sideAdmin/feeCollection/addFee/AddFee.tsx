import { Checkbox, Container, Grid, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { ClassType, StudentType } from "../../../../types/AdminProps.type";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../../util/message";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PaymentReceiptPDF from "../PaymentReceiptPDF";

import moment from "moment";
import { AuthContext } from "../../../../context/AuthContext";

const generateNumericId = () => {
  const min = 1000000000;
  const max = 9999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AddFee = () => {
  const [fee, setFee] = useState({});
  const [feeArray, setFeeArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string[]>([]);
  const [feeData, setFeeData] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const location = useLocation();
  const studentDataId = location?.state?.studentData;
  const [totalDue, setTotalDue] = useState(0);
  const { data: studentData, reFetch } = useFetch<StudentType | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student/${studentDataId?._id}`
  );

  const { data } = useFetch<ClassType | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class/filter-class?className=${
      studentData?.class
    }`
  );

  const { user } = useContext(AuthContext);

  const [totalWaiverValue, setTotalWaiverValue] = useState(0);
  const currentDate = moment();
  const currentMonthName = currentDate.format("MMMM");
  const [pdfData, setPDFData] = useState(null);
  const [delayDownload, setDelayDownload] = useState(false);
  const uniqueId = generateNumericId();
  const navigate = useNavigate();

  useEffect(() => {
    data?.fee && setFee(data.fee);
  }, [data]);
  useEffect(() => {
    studentData?.feeInfo &&
      studentData?.feeInfo?.forEach((item: any) => {
        setFeeData(item.paidInfo);
      });
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

  const flattenedMonths = feeData.reduce((acc: any, item: any) => {
    if (item && Array.isArray(item.allMonths)) {
      acc = acc.concat(item.allMonths);
    }
    return acc;
  }, []);

  const disabledMonths: any = new Set(flattenedMonths);
  const currentMonthIndex = months.indexOf(currentMonthName);
  const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
  const previousMonthName = months[previousMonthIndex];
  const monthsUntilPrevious = months.slice(0, previousMonthIndex + 1);
  const missingMonths = monthsUntilPrevious.filter(
    (month) => flattenedMonths.length > 0 && !flattenedMonths?.includes(month)
  );
  console.log(previousMonthName);
  console.log(missingMonths);

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: any,
    name: string,
    waiver: any
  ) => {
    const { checked } = e.target;
    const waiverValue = Number(waiver);
    const numberValue = Number(item.value);

    if (checked) {
      if (name === "Monthly fee") {
        const newItem = {
          ...item,
          value: (numberValue ?? 0) - waiverValue,
          allMonths: selectedMonth,
        };
        setSelectedItem((prev) => [...prev, newItem]);
        setTotalWaiverValue(
          (prev) => prev + waiverValue * selectedMonth.length
        );
      } else {
        const updatedItem = {
          ...item,
          value: (numberValue ?? 0) - waiverValue,
        };
        setSelectedItem((prev) => [...prev, updatedItem]);
        setTotalWaiverValue((prev) => prev + waiverValue);
      }
    } else {
      const filteredItems = selectedItem.filter((i) => i.name !== name);
      setSelectedItem(filteredItems);
      setTotalWaiverValue((prev) => prev - waiverValue);
    }
    setTotalDue(studentData?.feeInfo[0]?.due || 0);
  };

  const totalAmount = selectedItem?.reduce((acc: any, cur: any) => {
    let totalMonthFee;
    if (cur.name === "Monthly fee") {
      totalMonthFee = cur.value * selectedMonth.length + totalDue;
    }
    return (
      Number(acc) +
      Number(
        cur.name === "Monthly fee"
          ? totalMonthFee || 0 + totalDue
          : cur.value + totalDue
      )
    );
  }, 0);

  const handleChangeMultiple = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { options } = event.target;
    const value: any = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setTotalDue(studentData?.feeInfo[0]?.due || 0);
    setSelectedMonth(value);
  };

  const handleSubmit = async () => {
    if (totalPaid > 0) {
      const toSaved: any = [...selectedItem];
      const previous: any = [...feeData];
      const previousPaid: any = [];
      studentData?.feeInfo?.forEach((item: any) => {
        item?.paidData?.forEach((paid: any) => {
          if (paid) {
            previousPaid.push(paid);
          }
        });
      });
      previous?.forEach((item: any) => {
        if (item.name === "Monthly fee") {
          item.allMonths = [...item.allMonths, ...selectedMonth];
        }
      });

      toSaved?.forEach((item: any, i: any) => {
        if (
          item.name === "Monthly fee" &&
          !previous.find((prevItem: any) => prevItem.name === "Monthly fee")
        ) {
          if (item?.allMonths) {
            item.allMonths = [...flattenedMonths, ...toSaved[i]?.allMonths];
          } else {
            item.allMonths = [...flattenedMonths];
          }
          previous.push(item);
        } else if (
          !previous.find((prevItem: any) => prevItem.name === item.name)
        ) {
          previous.push(item);
        }
      });
      const newData: any = {
        selectedItem,
        due: totalAmount - totalPaid,
        paidDate: new Date().toISOString(),
        totalPaid,
        receiverName: user?.username,
        transactionId: uniqueId,
        totalAmount,
      };
      setPDFData(newData);

      const feeInfo = [
        {
          paidInfo: previous,
          totalAmount,
          due: totalDue,
          totalPaid: totalPaid,
          totalWaiver: totalWaiverValue,
          paidDate: new Date().toISOString(),
          paidData: [
            ...previousPaid,
            {
              paidDate: new Date().toISOString(),
              totalPaid,
              receiverName: user?.username,
              transactionId: uniqueId,
            },
          ],
        },
      ];
      setTimeout(() => {
        setDelayDownload(true);
      }, 1000);
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/student/${
            studentData?._id
          }`,
          { feeInfo }
        );
        if (res.status === 200) {
          if (user?.role === "admin") {
            addSuccessfully("Added Successfully");
            reFetch();
          } else {
            addSuccessfully("Added Successfully");
            reFetch();
          }
        }
      } catch (error) {
        toastError("Something is wrong");
      }
    } else {
      toastError("Add a paid amount");
    }
  };

  const handleBack = () => {
    navigate("/site-admin/fee-collection");
  };

  console.log({ pdfData });

  return (
    <div>
      <Container maxWidth="xl">
        <Paper
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <h3 className="dashboard_common_title">Add Fee</h3>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} lg={4} md={4}>
              {feeArray?.map((item: any) => {
                if (item.name !== "Monthly fee") {
                  return (
                    <div key={item?.name}>
                      <div>
                        {studentData?.admissionType === item.name ? (
                          <div>
                            <Checkbox
                              onChange={(e) =>
                                handleCheckbox(
                                  e,
                                  item,
                                  item?.name,
                                  studentData?.waiver[item?.name] || 0
                                )
                              }
                              value={item.value}
                              disabled={feeData.some(
                                (singleFee: any) => singleFee.name === item.name
                              )}
                            />{" "}
                            {studentData?.waiver[item?.name] ? (
                              <label htmlFor="">
                                {item?.name} -
                                {`${item?.value} TK - waiver: ${
                                  studentData?.waiver[item?.name]
                                } TK`}
                              </label>
                            ) : (
                              <label htmlFor="">
                                {item?.name}-<span> {item?.value} TK</span>
                              </label>
                            )}
                            {/* {item?.name}-<span> {item?.value} TK</span> */}
                          </div>
                        ) : (
                          <>
                            {item.name !== "Admission" &&
                              item.name !== "Re-Admission" && (
                                <div>
                                  <Checkbox
                                    onChange={(e) =>
                                      handleCheckbox(
                                        e,
                                        item,
                                        item?.name,
                                        studentData?.waiver[item?.name] || 0
                                      )
                                    }
                                    value={item.value}
                                    disabled={feeData.some(
                                      (singleFee: any) =>
                                        singleFee.name === item.name
                                    )}
                                  />{" "}
                                  {studentData?.waiver[item?.name] ? (
                                    <label htmlFor="">
                                      {item?.name} -{" "}
                                      {`${item?.value} TK - waiver: ${
                                        studentData?.waiver[item?.name]
                                      } TK`}
                                    </label>
                                  ) : (
                                    <label htmlFor="">
                                      {item?.name}-
                                      <span> {item?.value} TK</span>
                                    </label>
                                  )}
                                </div>
                              )}
                          </>
                        )}
                      </div>
                      {/* <div className="fee_checkbox">
                        {studentData?.waiver.length > 0 ? (
                          <label htmlFor="">{`${item?.value} - waiver: ${
                            studentData?.waiver[item?.name]
                          }`}</label>
                        ) : (
                          <label htmlFor="">{`${item?.value}`}</label>
                        )}
                      </div> */}
                    </div>
                  );
                }
              })}
              <div className="fee_checkbox" style={{ display: "none" }}>
                {feeArray.map((item: any) => {
                  if (item.name === "Monthly fee") {
                    return (
                      <>
                        <div>
                          <Checkbox
                            onChange={(e) =>
                              handleCheckbox(
                                e,
                                item,
                                item?.name,
                                studentData?.waiver[item?.name] || 0
                              )
                            }
                            value={item.value}
                            disabled={selectedMonth.length > 0 ? false : true}
                          />
                          {studentData?.waiver[item?.name] ? (
                            <label htmlFor="">
                              Monthly fee -{" "}
                              {`${item?.value} TK - waiver: ${
                                studentData?.waiver[item?.name]
                              } TK`}
                            </label>
                          ) : (
                            <label htmlFor="">Monthly fee-{item?.value}</label>
                          )}
                        </div>
                      </>
                    );
                  }
                })}
                <FormControl sx={{ m: 1, width: "100%", maxWidth: 300 }}>
                  <select
                    name=""
                    id=""
                    multiple
                    onChange={handleChangeMultiple}
                    className="text_field_multi"
                  >
                    {months.map((month: string) => (
                      <option
                        key={month}
                        value={month}
                        disabled={disabledMonths.has(month)}
                      >
                        {month}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} lg={8} md={8}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 0, sm: 0, md: 0 }}
              >
                <Grid item xs={12} lg={6} md={6}>
                  <h5 className="common_sub_title">Particular name</h5>
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                  <h5 className="common_sub_title">Amount</h5>
                </Grid>
                {totalDue > 0 && (
                  <>
                    <Grid item xs={12} lg={6} md={6}>
                      {totalDue > 0 && (
                        <h5 className="common_medium_title">Previous Due</h5>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={6} md={6}>
                      {totalDue > 0 && (
                        <h5 className="common_medium_title due_amount">
                          {totalDue} / Tk
                        </h5>
                      )}
                    </Grid>
                  </>
                )}
                {selectedItem?.map((item) => (
                  <>
                    <Grid item xs={12} lg={6} md={6} key={item?.name}>
                      {item.name !== "Monthly fee" ? (
                        <h5 className="common_medium_title">{item?.name}</h5>
                      ) : (
                        <>
                          <h5 className="common_medium_title">{item?.name}</h5>
                          <div className="list_of_month">
                            {item?.allMonths?.map((item: any) => (
                              <p key={item}>{item}</p>
                            ))}
                          </div>
                        </>
                      )}
                    </Grid>

                    <Grid item xs={12} lg={6} md={6}>
                      {item.name !== "Monthly fee" ? (
                        <h5 className="common_medium_title">{item?.value}</h5>
                      ) : (
                        <h5 className="common_medium_title">
                          {Number(item?.value) * item?.allMonths?.length}
                        </h5>
                      )}
                    </Grid>
                  </>
                ))}

                {selectedItem?.length > 0 && (
                  <Grid item xs={12} lg={6} md={6}>
                    <div className="fee_header">
                      <hr />
                    </div>
                    <h5 className="common_medium_title">Total</h5>
                    <h5 className="common_medium_title">Paid Amount</h5>
                  </Grid>
                )}
                {selectedItem?.length > 0 && (
                  <Grid item xs={12} lg={6} md={6}>
                    <div className="fee_header">
                      <hr />
                    </div>
                    <h5 className="common_medium_title">{totalAmount} / Tk</h5>

                    <div>
                      <input
                        type="number"
                        className="paid_field"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTotalPaid(Number(e.target.value))
                        }
                      />
                    </div>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <div className="shaw_fee_collection">
            {selectedItem?.length > 0 && (
              <div className="fee_pain_btn_container">
                <button className="print_btn">Cancel</button>
                {delayDownload && pdfData && (
                  <PDFDownloadLink
                    document={
                      <PaymentReceiptPDF
                        data={pdfData}
                        studentData={studentData}
                      />
                    }
                    fileName="payment_receipt.pdf"
                  >
                    {({ loading }) => (
                      <span className="print_btn">
                        {loading ? "Print Now" : "Print Now"}
                      </span>
                    )}
                  </PDFDownloadLink>
                )}
                <button
                  className="print_btn"
                  onClick={handleSubmit}
                  style={{ textAlign: "right" }}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
          <div className="dashboard_btn_container">
            <button className="submit_btn" onClick={handleBack}>
              Previous
            </button>
            <button className=""></button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default AddFee;
