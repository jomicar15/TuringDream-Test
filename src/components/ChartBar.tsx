import { TComponentChartBar } from "../Types/TChartBar";
import { BarChart } from "@mui/x-charts/BarChart";
import { Grid2 } from "@mui/material";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEffect, useState } from "react";

function ChartBar(component: TComponentChartBar) {
  const { title, groups, height, width, attributes } = component;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const adjustedWidth =
    windowSize.width < 1024
      ? windowSize.width - 100
      : Math.min(width, windowSize.width * 0.55);

  const chartSetting = {
    width: adjustedWidth,
    height: height,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  type AttributeGroup = {
    [key: string]: number | string;
    group: string;
  };

  const currentData = groups.map((item) => {
    const currentItem: AttributeGroup = item.attributes.reduce((acc, att) => {
      acc[att.attribute.id] = att.value;
      return acc;
    }, {} as AttributeGroup);

    currentItem.group = item.id;
    return currentItem;
  });

  const seriesData = attributes.map((item) => {
    return { dataKey: item.id, label: item.title };
  });

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      sx={{ background: "white", borderRadius: "10px", padding: "10px" }}
    >
      <h2 style={{ color: "black", fontFamily: "roboto", fontWeight: "300" }}>
        {title}
      </h2>
      {currentData?.length > 0 && (
        <BarChart
          dataset={currentData}
          xAxis={[{ scaleType: "band", dataKey: "group" }]}
          series={seriesData}
          {...chartSetting}
        />
      )}
    </Grid2>
  );
}

export default ChartBar;
