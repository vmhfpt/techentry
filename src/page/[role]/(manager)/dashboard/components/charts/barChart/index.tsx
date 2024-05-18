
  import Chart from "react-apexcharts";

  const Barchart = ({color}: {color: string}) => {
      const chartConfig = {
          type: "bar",
          height: 250,
          series: [
            {
              name: "Sales",
              data: [100, 150, 345, 320, 500, 200, 150, 230, 500],
            },
            {
              name: "profit",
              data: [60, 100, 50, 40, 400, 300, 45, 25, 56],
            }
          ],
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
            colors: ['#3a416f', '#17c1e8'],
            plotOptions: {
              bar: {
                columnWidth: "35%",
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
                  colors: "#94a3b8",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  fontWeight: 400,
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
            legend: {
              show: false,
              position: 'top',
              horizontalAlign: 'right',
            }
          },
      };

      return (
          <>
              <Chart {...chartConfig} />
          </>
      );
  }

  export default Barchart