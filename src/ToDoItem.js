import { useState } from "react";

function ToDoItem({
    title,
    description,
    id,
    stillTodo,
    updateCallback,
    removeCallback,
}) {
    const [done, setDone] = useState(stillTodo);

    function onFinishClick() {
        setDone((done) => !done);
        updateCallback(id, !done);
        console.log(done);
    }

    function onRemoveCallback() {
        removeCallback(id);
    }

    return (
        <div className="p-5">
            <div className="rounded-md bg-white shadow-lg p-5">
                <h1 className="text-xl font-bold py-2">{title}</h1>
                <p className="py-2">{description}</p>
                <div className="flex justify-between">
                    <button className="py-2" onClick={onRemoveCallback}>
                        Remove Todo
                    </button>
                    <button onClick={onFinishClick}>
                        {done ? "Set Undone" : "Set Done"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ToDoItem;
