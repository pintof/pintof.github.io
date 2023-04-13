function SportsCardComponent({ team_logo, sport, className }) {
  return (
    <div className={className}>
      <div className="container">
        <h1>{sport}</h1>
        <img src={team_logo} alt={sport} />
      </div>
    </div>
  );
}

export default SportsCardComponent;
