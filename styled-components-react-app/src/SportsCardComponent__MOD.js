import { StyledDiv, StyledImg, StyledH1 } from "./SportsCardStyles__MOD.css";

function SportsCardComponent__MOD({ team_logo, sport }) {
  return (
    <StyledDiv className="container">
      <StyledH1>{sport}</StyledH1>
      <StyledImg src={team_logo} alt={sport} />
    </StyledDiv>
  );
}

export default SportsCardComponent__MOD;
