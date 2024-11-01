import styled from "@emotion/styled";
import { ContainerChartBar } from "./components/ContainerChartBar";
import { MOCK_COMPONENTCHARTBAR } from "./constants/mockData";
import "./App.css";

const TuringDream = styled("section")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  color: "white",
  width: "100%",
  h1: {
    letterSpacing: "2px",
    color: "white",
  },
  button: {
    color: "white",
    background: "#FA1FB2",
  },
});

function App() {
  return (
    <TuringDream>
      <ContainerChartBar {...{ ...MOCK_COMPONENTCHARTBAR }} />
    </TuringDream>
  );
}

export default App;
