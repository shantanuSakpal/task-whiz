import React from "react";

const Leaderboard = ({ }) => {
    const employees = [
        {
            "id": "E12345",
            "skills": [
                {
                    "flutter": "60"
                },
                {
                    "figma": "80"
                },
                {
                    "backend": "50"
                }
            ],
            "team_name": "dev",
            "tasks": [
                "T12345",
                "T12346"
            ],
            "points": "105",
            "name": "Abhishek "
        },
        {
            "id": "E12345",
            "skills": [
                {
                    "flutter": "60"
                },
                {
                    "figma": "80"
                },
                {
                    "backend": "50"
                }
            ],
            "team_name": "Desgin",
            "tasks": [
                "T12345",
                "T12346"
            ],
            "points": "90",
            "name": "Shantanu "
        },
        {
            "id": "E12345",
            "skills": [
                {
                    "flutter": "60"
                },
                {
                    "figma": "80"
                },
                {
                    "backend": "50"
                }
            ],
            "team_name": "Sales",
            "tasks": [
                "T12345",
                "T12346"
            ],
            "points": "290",
            "name": "Uday "
        },
        {
            "id": "E12345",
            "skills": [
                {
                    "flutter": "60"
                },
                {
                    "figma": "80"
                },
                {
                    "backend": "50"
                }
            ],
            "team_name": "dev",
            "tasks": [
                "T12345",
                "T12346"
            ],
            "points": "60",
            "name": "Harsh "
        },
    ]
  // Sort employees based on points in descending order
  const sortedEmployees = [...employees].sort((a, b) => b.points - a.points);

  return (
    <div className="p-2">
      <h2 className="p-2">Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableCellStyle}>Rank</th>
            <th style={tableCellStyle}>Name</th>
            <th style={tableCellStyle}>Team</th>
            <th style={tableCellStyle}>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee, index) => (
            <tr key={employee.id}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{employee.name}</td>
              <td style={tableCellStyle}>{employee.team_name}</td>
              <td style={tableCellStyle}>{employee.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

export default Leaderboard;
