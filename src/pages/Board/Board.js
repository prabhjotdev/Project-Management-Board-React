import { useState, useEffect } from "react";
import Lane from "../../components/Lane/Lane";
import "./Board.css";

const lanes = [
  { id: 1, title: "To Do" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Review" },
  { id: 4, title: "Done" },
];

function Board() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const tasks = await fetch(
          `https://my-json-server.typicode.com/Packtpublishing/React-Projects-Second-Edition/tasks`,
        );
        const result = await tasks.json();
        console.log(`Results: ${result}`)
        if (result) {
          console.log("Result successful");
          setTasks(result);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="Board-wrapper">
      {lanes.map((lane) => (
        <Lane
          key={lane.id}
          title={lane.title}
          loading={loading}
          error={error}
          tasks={tasks.filter((task) => task.lane === lane.id)}
        />
      ))}
    </div>
  );
}

export default Board;
