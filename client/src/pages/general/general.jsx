import "./general.css";
import TypeWriter from "../../components/TypeWriter";
import SigCard from "../../components/sigcard";
import ACMBoard from "../acm_board/acm_board";

function General() {
    return (
        <div className="general">
            <TypeWriter words={["Caffeine"]} />
            <h1>General Page</h1>
            <p>This is the general page of the ACM website.</p>
            <SigCard/>
            <ACMBoard />
        </div>
    );
}

export default General;