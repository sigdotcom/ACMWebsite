import "./general.css";
import TypeWriter from "../../components/TypeWriter";
import ACMBoard from "../../components/acm_board/acm_board";
import UpcomingEvent from "../../components/upcoming_events/upcoming_events";

function General() {
    return (
        <div className="general">
            <TypeWriter words={["Caffeine"]} />
            <h1>General Page</h1>
            <p>This is the general page of the ACM website.</p>
        </div>
    );
}

export default General;