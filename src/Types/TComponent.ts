import { GridSize } from "@mui/material";

export interface TComponent {
  id: string;
  name: string;
  type: TComponentTypes;
  xs: GridSize;
  sm: GridSize;
  md: GridSize;
  lg: GridSize;
  xl: GridSize;
  containerId?: string;
  visible: boolean;
  disabled: boolean;
  showSnaphotButton?: boolean;
}

export const EMPTY_COMPONENT: TComponent = {
  id: "",
  name: "",
  type: "",
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  visible: true,
  disabled: false,
  showSnaphotButton: true,
};

export type TComponentTypes =
  | ""
  | "chat"
  | "image"
  | "label"
  | "form"
  | "group"
  | "button"
  | "divider"
  | "input"
  | "timer"
  | "textarea"
  | "video"
  | "iframe"
  | "blackboard"
  | "mathfunctiongraph"
  | "pdfviewer"
  | "audio"
  | "cytoscape"
  | "sketch"
  | "nodesviewer"
  | "modeldesigner"
  | "dashboard"
  | "widget"
  | "usereditor"
  | "numberline"
  | "matrix"
  | "determinant"
  | "geometry3d"
  | "chartBar"
  | "chartLine"
  | "chartPie"
  | "chartScatter"
  | "markdown"
  | "calendar"
  | "triangle"
  | "table";
