import './home.css';
import { useBro } from '../../context/brocon';

export const Home = () => {
    const { name, Brodispatch } = useBro();

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleName = (event) => {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            Brodispatch({
                type: "NAME",
                payload: event.target.value.trim()
            });
            localStorage.setItem("name", event.target.value.trim());
        }
    };

    return (
        <div className="home-container d-flex direction-column align-center gap-lg">
            <h1 className="main-heading">todo_extension</h1>
            <div className="user-details">
                <span className="heading-1">Hi! What's your name?</span>
                <form onSubmit={handleSubmit}>
                    <input  required className="input" type="text" onKeyPress={handleName} />
                </form>
            </div>
        </div>
    );
};
