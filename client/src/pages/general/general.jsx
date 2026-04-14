import "./general.css";
import TypeWriter from "../../components/TypeWriter";
import SigCard from "../../components/sigcard";
import ACMBoard from "../../components/acm_board/acm_board";
import UpcomingEvent from "../../components/upcoming_events/upcoming_events";

function General() {
    return (
        <div className="general">
            <UpcomingEvent />
            <ACMBoard />
            <SigCard/>
        </div>
    );
}

export default General;