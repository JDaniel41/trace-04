import ToDoItem from "./ToDoItem";
import { useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [nextAvailId, setNextAvailId] = useState(0);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [showAllTasks, setShowAllTasks] = useState(true);

    function renderTasks() {
        if (!showAllTasks) {
            return tasks
                .filter((task) => task.isFinished === false)
                .map((task) => {
                    return (
                        <ToDoItem
                            title={task.title}
                            description={task.description}
                            id={task.id}
                            key={task.id}
                            stillTodo={task.isFinished}
                            updateCallback={updateDone}
                            removeCallback={removeTask}
                        />
                    );
                });
        } else {
            return tasks.map((task) => {
                return (
                    <ToDoItem
                        title={task.title}
                        description={task.description}
                        id={task.id}
                        key={task.id}
                        stillTodo={task.isFinished}
                        updateCallback={updateDone}
                        removeCallback={removeTask}
                    />
                );
            });
        }
    }

    function handleShowUnfinishedTasksClick() {
        setShowAllTasks(!showAllTasks);
    }

    function updateDone(taskId, newDoneStatus) {
        console.log("I am being called");
        let newTasks = [...tasks];
        let taskObj = newTasks.find((task) => task.id === taskId);
        taskObj.isFinished = newDoneStatus;
        setTasks(newTasks);
    }

    function removeTask(taskId) {
        let newTasks = tasks.filter((task) => task.id !== taskId);

        setTasks(newTasks);
    }

    function handleTitleChange(e) {
        console.log(e.target.value);
        setNewTaskTitle(e.target.value);
    }

    function handleDescriptionChange(e) {
        console.log(e.target.value);
        setNewTaskDescription(e.target.value);
    }

    function handleNewTaskSubmit(e) {
        e.preventDefault();
        setTasks((oldTasks) => [
            ...oldTasks,
            {
                title: newTaskTitle,
                description: newTaskDescription,
                isFinished: false,
                id: nextAvailId,
            },
        ]);
        setNextAvailId((lastUsedId) => lastUsedId + 1);

        setNewTaskTitle("");
        setNewTaskDescription("");
        console.log();
    }

    return (
        <div className="bg-gray-100 grid grid-cols-2">
            <div>
                <form>
                    <label for="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={newTaskTitle}
                        onChange={handleTitleChange}
                    />
                    <br />
                    <label for="description">Description: </label>
                    <input
                        type="text"
                        id="description"
                        value={newTaskDescription}
                        onChange={handleDescriptionChange}
                    />
                    <br />
                    <input type="submit" onClick={handleNewTaskSubmit} />
                </form>

                <button onClick={handleShowUnfinishedTasksClick}>
                    {showAllTasks
                        ? "Click to show all unfinished tasks"
                        : "Click to show all tasks"}
                </button>
            </div>
            <div>{renderTasks()}</div>
        </div>
    );
}

export default App;
