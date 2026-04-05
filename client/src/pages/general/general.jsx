import "./general.css";
import TypeWriter from "../../components/TypeWriter";
import UpcomingEvent from "./upcoming_events/upcoming_events";

function General() {
    return (
        <div className="general">
            <UpcomingEvent />
        </div>
    );
}

export default General;