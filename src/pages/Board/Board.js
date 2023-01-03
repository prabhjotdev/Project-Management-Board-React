import { useState, useEffect } from "react";
import useDataFetching from "../../useDataFetching";
import Lane from "../../components/Lane/Lane";
import "./Board.css";

const lanes = [
  { id: 1, title: "To Do" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Review" },
  { id: 4, title: "Done" },
];

const onDragStart = (e, id) =>{
  e.dataTransfer.setData('id', id);
}

const onDragOver = (e) =>{
  e.preventDefault();
}

function Board() {
  const [loading, error, data] = useDataFetching(`https://my-json-server.typicode.com/Packtpublishing/React-Projects-Second-Edition/tasks`);
  const [tasks, setTasks] = useState([]);

  useEffect(() =>{
    setTasks(data);
  }, [data]);

  const onDrop = (e, laneId) =>{
    const id = e.dataTransfer.getData('id');

    const updateTasks = tasks.filter((task)=>{
      if(task.id.toString() === id){
        task.lane = laneId;
      }
      return task;
    });

    setTasks(updateTasks);
  }

  return (
    <div className="Board-wrapper">
      {lanes.map((lane) => (
        <Lane
          key={lane.id}
          laneId = {lane.id}
          title={lane.title}
          loading={loading}
          error={error}
          tasks={tasks.filter((task) => task.lane === lane.id)}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}

export default Board;
