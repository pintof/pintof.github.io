import "./SportsCardStyles.css";

function SportsCardComponent({ team_logo, sport }) {
  return (
    <div className="container">
      <h1 style={{ color: sport === "BASKETBALL" ? "pink" : "lightblue" }}>
        {sport}
      </h1>
      <img
        src={team_logo}
        style={{
          backgroundColor: sport === "BASKETBALL" ? "pink" : "lightblue",
        }}
        alt={sport}
      />
    </div>
  );
}

export default SportsCardComponent;
