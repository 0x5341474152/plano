import "./task.css";
import { useBro } from "../../context/brocon";
import { Fragment, useEffect, useState } from "react";
import { quotes } from "../../database/quotes";
import {Todo} from "../../components/todo/todo"

const index = Math.floor(Math.random() * quotes.length);
const quote = quotes[index].quote;

export const Task = () => {
    const { name, time, message, task, Brodispatch } = useBro();
    const [isChecked, setIsChecked] = useState(false);
    const [isTodoOpen, setIsTodoOpen] = useState(false);
    useEffect(() => {
        const updateCurrentTime = () => {
            const today = new Date();
            const hours = today.getHours();
            const minutes = today.getMinutes();

            const hour = hours < 10 ? `0${hours}` : hours;
            const minute = minutes < 10 ? `0${minutes}` : minutes;

            const currentTime = `${hour}:${minute}`;

            Brodispatch({
                type: "TIME",
                payload: currentTime
            });

            Brodispatch({
                type: "MESSAGE",
                payload: hours
            });
        };

        updateCurrentTime();
        const intervalId = setInterval(updateCurrentTime, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [Brodispatch]);

    useEffect(() => {
        const userTask = localStorage.getItem("task");
        if (userTask) {
            Brodispatch({
                type: "TASK",
                payload: userTask
            });
        }
    }, [Brodispatch]);

    useEffect(() => {
        const checkStatus = localStorage.getItem("checkedStatus") === "true";
        setIsChecked(checkStatus);
    }, []);

    const handleTask = (event) => {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            Brodispatch({
                type: "TASK",
                payload: event.target.value.trim()
            });
            localStorage.setItem("task", event.target.value.trim());
            localStorage.setItem("date", new Date().getDate().toString());
        }
    };
    const handleToDoClick = () => {
        setIsTodoOpen(isTodoOpen => !isTodoOpen);
    }

    const handlechange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        localStorage.setItem("checkedStatus", checked.toString());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleClearClick=()=>{
        Brodispatch({
            type:"CLEAR"

        })
        setIsChecked(false);
        localStorage.removeItem("task");
        localStorage.removeItem("checkedStatus");
    }
    return (
        <div className="task-container d-flex direction-column align-center relative">
            <span className="time">{time}</span>
            <span className="message">{message}, {name}</span>
            {name != null && task == null ? (
                <Fragment>
                    <span className="focus-question">What's your main focus today?</span>
                    <form onSubmit={handleSubmit}>
                        <input required className="input task-input" onKeyPress={handleTask} />
                    </form>
                </Fragment>
            ) : (

                <div className="user-task-container">
                    <span className="heading-2">Today's Focus:</span>
                    <div className="d-flex align-center">
                        <label className={`${isChecked ? "strike-through" : ""} heading-3 d-flex align-center gap-sm cursor`}>
                            <input className="check cursor" type="checkbox" onChange={handlechange} checked={isChecked} />
                            {task}
                        </label>
                        <button className="button cursor" onClick={handleClearClick}><span class="material-symbols-outlined">
                            delete
                        </span></button>
                    </div>
                </div>
            )}
            <div className="quote-container" >
                <span className="heading-3">{quote}</span>
            </div>
            {isTodoOpen && <Todo />}
            <div className="todo-btn-container absolute">
                <button className="button cursor todo-btn" onClick={handleToDoClick}>ToDo</button>
            </div>
        </div>
    );
};
