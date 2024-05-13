import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import useFetch from "../../../hooks/useFetch";
import { StudentType } from "../../../types/AdminProps.type";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const paidData = [
  { monthName: "May 2024", paidAmount: 800 },
  { monthName: "June 2024", paidAmount: 700 },
  { monthName: "July 2024", paidAmount: 1000 },
  { monthName: "August 2024", paidAmount: 800 },
  { monthName: "September 2024", paidAmount: 1000 },
  { monthName: "October 2024", paidAmount: 1500 },
  { monthName: "November 2024", paidAmount: 2200 },
  { monthName: "December 2024", paidAmount: 5000 },
];

const FeeChart = () => {
  const { data, loading, error } = useFetch<StudentType[] | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student/payment/monthly`
  );
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const chartSeries: any = [
    {
      name: "Total Paid",
      data: data?.map((item: any) => item.paidAmount),
    },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar", // Bar chart
      height: 450,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
      },
    },
    xaxis: {
      categories: paidData?.map((item: any) => item.monthName),
    },
    colors: ["#4CAF50"],
    dataLabels: {
      enabled: false,
    },
  };

  const handleClick = () => {
    navigate("/site-admin/pay-fee");
  };
  return (
    <div>
      <div className="fee_text_btn">
        <h3 className="dashboard_common_title">Total Paid Amount by Month</h3>
        <button className="view_product_btn" onClick={handleClick}>
          Pay Fee
        </button>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default FeeChart;
