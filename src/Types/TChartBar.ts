import { EMPTY_COMPONENT, TComponent } from "./TComponent";

export interface TComponentChartBar extends TComponent {
  title: string;
  groups: TComponentChartGroup[];
  attributes: TComponentChartAttribute[];
  height: number;
  width: number;
}

export interface TComponentChartAttribute {
  title: string;
  id: string;
}

export interface TComponentChartGroup {
  id: string;
  attributes: TComponentChartGroupAttribute[];
}

export interface TComponentChartGroupAttribute {
  attribute: TComponentChartAttribute;
  value: number;
}

export const EMPTY_COMPONENTCHARTBAR: TComponentChartBar = {
  ...EMPTY_COMPONENT,
  id: "chartBar_",
  name: "chartBar",
  type: "chartBar",
  title: "Chart Bar",
  groups: [],
  height: 300,
  width: 300,
  attributes: [],
};
