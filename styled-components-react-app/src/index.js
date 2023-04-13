import ReactDOM from "react-dom/client";

import {
  SportsCardStyles,
  BasketballCardStyles,
  BaseballCardStyles,
} from "./SportsCardStyles.css";
import Theme from "./Theme";

import jays from "./jays.svg";
import raptors from "./raptors.png";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <SportsCardStyles theme="BASEBALL" team_logo={jays} sport="BASEBALL" />
    <SportsCardStyles
      theme="BASKETBALL"
      team_logo={raptors}
      sport="BASKETBALL"
    />
    <BasketballCardStyles team_logo={raptors} sport="BASKETBALL" />
    <Theme>
      <BaseballCardStyles team_logo={jays} sport="BASEBALL" />
    </Theme>
  </>
);
