import "./general.css";
import TypeWriter from "../../components/TypeWriter";
import SigCard from "../../components/sigcard";

import ACMBoard from "../../components/acm_board/acm_board";
import UpcomingEvent from "../../components/upcoming_events/upcoming_events";
import ImageGallery from "../../components/image_gallery/image_gallery";

function General() {
    return (
        <div className="general">
            <SigCard/>
            <UpcomingEvent />
            <ACMBoard />
            <ImageGallery autoSwap={true}/>
        </div>
    );
}

export default General;