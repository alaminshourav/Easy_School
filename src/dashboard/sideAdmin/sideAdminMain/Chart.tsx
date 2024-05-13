import { useEffect, useState } from "react";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import useFetch from "../../../hooks/useFetch";
import { StudentType } from "../../../types/AdminProps.type";
import Loader from "../../../components/loader/Loader";

const Chart = () => {
  const { data, loading, error } = useFetch<StudentType[] | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/student`
  );

  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    if (data) {
      const grouped = data.reduce((acc: any, item: any) => {
        if (!item.registrationDate) {
          return acc;
        }

        const registrationYear = moment(item.registrationDate).year();

        if (acc[registrationYear]) {
          acc[registrationYear] += 1;
        } else {
          acc[registrationYear] = 1;
        }

        return acc;
      }, {});

      setGroupedData(grouped); // Store the grouped data in state
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const chartSeries: any = [
    {
      name: "Number of Users",
      data: Object.values(groupedData),
    },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10%",
      },
    },
    xaxis: {
      categories: Object.keys(groupedData),
    },
    colors: ["#4CAF50"],
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div>
      <h3 className="dashboard_common_title">User Registrations by Year</h3>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Chart;
