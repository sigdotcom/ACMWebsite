import "./general.css";
import TypeWriter from "../../components/TypeWriter";

function General() {
    return (
        <div className="general">
            <TypeWriter words={["Balls"]} />
            <h1>General Page</h1>
            <p>This is the general page of the ACM website.</p>
        </div>
    );
}

export default General;