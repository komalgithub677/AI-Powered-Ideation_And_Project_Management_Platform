import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function KanbanBoard({ selectedTeam }) {
  const [tasks, setTasks] = useState([]);
  const statuses = ["To Do", "In Progress", "Done"];

  // Fetch tasks for the selected team
  const fetchTasks = async () => {
    if (!selectedTeam) return;
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      const teamTasks = res.data.filter((t) => t.teamId === selectedTeam._id);
      setTasks(teamTasks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedTeam]);

  // Handle drag-and-drop
  const handleDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const newStatus = statuses[destination.droppableId];

    try {
      // Update task status in backend
      await axios.put(`http://localhost:5000/api/tasks/${draggableId}`, {
        status: newStatus,
      });

      // Update frontend state
      setTasks((prev) =>
        prev.map((t) => (t._id === draggableId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        {statuses.map((status, index) => (
          <Droppable droppableId={`${index}`} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 min-w-[250px] bg-gray-100 rounded-lg p-4 shadow"
              >
                <h3 className="font-bold mb-4 text-center">{status}</h3>

                {tasks
                  .filter((task) => task.status === status)
                  .map((task, idx) => (
                    <Draggable key={task._id} draggableId={task._id} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 mb-3 bg-white rounded shadow cursor-pointer"
                        >
                          <h4 className="font-semibold">{task.title}</h4>
                          <p className="text-gray-600 text-sm">{task.desc}</p>
                          <p className="text-xs mt-1">
                            <span className="font-medium">Assigned:</span>{" "}
                            {task.assignedTo.join(", ")}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
