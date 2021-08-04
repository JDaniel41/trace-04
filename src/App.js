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
        <div className="bg-gray-100 grid grid-cols-2 min-h-screen">
            <div>
                <div className="p-5">
                    <div className="rounded-md bg-white shadow-lg p-5 flex flex-col">
                        <h1 className="text-center text-2xl font-bold">
                            Add New Tasks Here:
                        </h1>
                        <form className="flex flex-col">
                            <div className="flex justify-end pt-2">
                                <label for="title" className="p-2">
                                    Title:
                                </label>
                                <input
                                    className="bg-gray-300 rounded-lg p-2"
                                    type="text"
                                    id="title"
                                    value={newTaskTitle}
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <div className="flex justify-end py-2">
                                <label for="description" className="p-2">
                                    Description:{" "}
                                </label>
                                <input
                                    className="bg-gray-300 rounded-lg p-2"
                                    type="text"
                                    id="description"
                                    value={newTaskDescription}
                                    onChange={handleDescriptionChange}
                                />
                            </div>
                            <input
                                type="submit"
                                className="py-2 rounded-lg justify-self-center"
                                onClick={handleNewTaskSubmit}
                            />
                        </form>
                        <div className="flex flex-col py-3">
                            <button
                                onClick={handleShowUnfinishedTasksClick}
                                className="py-2 rounded-lg justify-self-center bg-gray-200"
                            >
                                {showAllTasks
                                    ? "Click to show all unfinished tasks"
                                    : "Click to show all tasks"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>{renderTasks()}</div>
        </div>
    );
}

export default App;
