interface ProfessorAlterProps {
  accomplishments?: string[];
  yearsOfExperience?: number;
  favoriteQuote?: string;
}

const BlowUp = ({
  accomplishments = [
    "Outstanding Professor",
    "Expert in Disruptive Design",
    "Inspiring Mentor",
  ],
  yearsOfExperience = 20,
  favoriteQuote = "Design is not about typing, it's about thinking.",
}: ProfessorAlterProps) => {
  return (
    <div
      className="altar-container"
      style={{
        textAlign: "center",
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>🏆 Professor Rui Carreto 🏆</h1>
      <h2>A Tribute to Excellence</h2>

      <div className="accomplishments">
        <h3>{yearsOfExperience} Years of Inspiring Students</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {accomplishments.map((achievement, index) => (
            <li key={index}>✨ {achievement}</li>
          ))}
        </ul>
      </div>

      <blockquote
        style={{
          fontStyle: "italic",
          margin: "2rem 0",
        }}
      >
        "{favoriteQuote}"
      </blockquote>
    </div>
  );
};

export default BlowUp;
