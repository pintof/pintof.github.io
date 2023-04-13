import styled from "styled-components";
import SportsCardComponent from "./SportsCardComponent";

export const SportsCardStyles = styled(SportsCardComponent)`
  .container {
    background-color: rgb(57, 121, 177);
    text-align: center;
    width: 50vw;
    margin: auto;
  }

  img {
    background-color: ${(props) =>
      props.theme === "BASKETBALL" ? "pink" : "lightblue"};
    border: 5px solid white;
    vertical-align: middle;
    width: 15vw;
  }

  h1 {
    color: ${(props) => (props.theme === "BASKETBALL" ? "pink" : "lightblue")};
    font-family: "Segoe UI";
    -webkit-text-stroke: 1px white;
  }
`;

export const BasketballCardStyles = styled(SportsCardStyles)`
  img {
    background-color: pink;
  }
  h1 {
    color: pink;
  }
`;

export const BaseballCardStyles = styled(SportsCardComponent)`
  .container {
    background-color: rgb(57, 121, 177);
    text-align: center;
    width: 50vw;
    margin: auto;
  }

  img {
    background-color: ${(props) => props.theme.baseball.backgroundColor};
    border: 5px solid white;
    vertical-align: middle;
    width: 15vw;
  }

  h1 {
    color: ${(props) => props.theme.baseball.color};
    font-family: "Segoe UI";
    -webkit-text-stroke: 1px white;
  }
`;
