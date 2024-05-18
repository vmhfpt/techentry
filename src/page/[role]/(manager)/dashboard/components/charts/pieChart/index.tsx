
import Chart from "react-apexcharts";

const Piechart = ({color}: {color: string}) => {
    const chartConfig = {
        type: "pie",
        height: 250,
        series: [50, 100, 60],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          title: {
            show: "",
          },
          dataLabels: {
            enabled: false,
          },
          colors: ['#fff'],
          plotOptions: {
            bar: {
              columnWidth: "20%",
              borderRadius: 2,
            },
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              show: true,
              style: {
                colors: "white",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 700,
              },
            },
            categories: [
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          yaxis: {
            labels: {
              show: false,
              style: {
                colors: "white",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 700,
              },
            },
          },
          grid: {
            show: false,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: false,
              },
            },
            padding: {
              left: 0,
              bottom: 10
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: "dark",
          },
        },
    };

    return (
        <>
            <Chart {...chartConfig} />
        </>
    );
}

export default Piechart