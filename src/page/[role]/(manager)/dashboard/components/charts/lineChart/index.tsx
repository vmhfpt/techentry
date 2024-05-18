import Chart from "react-apexcharts";
 
export default function LineChart({color}: {color: string}) {

  const chartConfig = {
    type: "area",
    height: 250,
    series: [
      {
        name: 'category',
        data: [300, 150, 300, 320, 500, 350, 270, 300, 700],
        color: '#17c1e8',
        
      },  
      {
        name: 'product',
        data: [200, 300, 340, 620, 600, 650, 200, 230, 400],
        color: '#3a416f'
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
      colors: [color],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
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
            colors: "gray",
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
            colors: "gray",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 700,
          },
        },
        // min: 5,
        // max: 500
      },
      grid: {
        show: false,
        borderColor: "#dddddd",
        strokeDashArray: 3,
        
        xaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          left: 0,
          bottom: 0
        },
      },
      fill: {
        type: 'gradient', // Sử dụng gradient color
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        }
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'right',
      }
    },
  };
  return (
    <Chart {...chartConfig} />
  );
}