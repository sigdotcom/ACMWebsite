import "./general.css";
import TypeWriter from "../../components/TypeWriter";
import ACMBoard from "../../components/acm_board/acm_board";
import UpcomingEvent from "../../components/upcoming_events/upcoming_events";
import Sponsors from "../../components/sponsors/sponsors";

function General() {
    return (
        <div className="general">
            <UpcomingEvent />
            <ACMBoard />
            <Sponsors />
        </div>
    );
}

export default General;