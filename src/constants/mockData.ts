import { TComponentChartBar } from "../Types/TChartBar";
import { EMPTY_COMPONENT } from "../Types/TComponent";

export const MOCK_COMPONENTCHARTBAR: TComponentChartBar = {
  ...EMPTY_COMPONENT,
  id: "chartBar_1",
  name: "SalesChart",
  type: "chartBar",
  title: "Monthly Sales Data",
  width: 600,
  height: 400,
  attributes: [
    { title: "Total Sales", id: "total_sales" },
    { title: "Units Sold", id: "units_sold" },
    { title: "Returns", id: "returns" },
  ],
  groups: [
    {
      id: "January",
      attributes: [
        { attribute: { title: "Total Sales", id: "total_sales" }, value: 12 },
        { attribute: { title: "Units Sold", id: "units_sold" }, value: 3 },
        { attribute: { title: "Returns", id: "returns" }, value: 5 },
      ],
    },
    {
      id: "February",
      attributes: [
        { attribute: { title: "Total Sales", id: "total_sales" }, value: 15 },
        { attribute: { title: "Units Sold", id: "units_sold" }, value: 4 },
        { attribute: { title: "Returns", id: "returns" }, value: 3 },
      ],
    },
    {
      id: "March",
      attributes: [
        { attribute: { title: "Total Sales", id: "total_sales" }, value: 11 },
        { attribute: { title: "Units Sold", id: "units_sold" }, value: 25 },
        { attribute: { title: "Returns", id: "returns" }, value: 4 },
      ],
    },
  ],
};
