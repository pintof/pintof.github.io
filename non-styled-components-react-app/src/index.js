import ReactDOM from "react-dom/client";

import SportsCardComponent from "./SportsCardComponent";

import jays from "./jays.svg";
import raptors from "./raptors.png";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <SportsCardComponent team_logo={jays} sport="BASEBALL" />
    <SportsCardComponent team_logo={raptors} sport="BASKETBALL" />
  </>
);
