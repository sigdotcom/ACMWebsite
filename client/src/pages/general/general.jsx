import "./general.css";
import TypeWriter from "../../components/TypeWriter";
import SigCard from "../../components/sigcard";
import ACMBoard from "../../components/acm_board/acm_board";
import UpcomingEvent from "../../components/upcoming_events/upcoming_events";

import Header from "../../components/header/header";
import ImageGallery from "../../components/image_gallery/image_gallery";
import Sponsors from "../../components/sponsors/sponsors";

function General() {
    return (
        <div className="general">
            <Header />

            <section id="sigs"> 
                <SigCard/>
            </section>

            <section id="events">
                <UpcomingEvent />
            </section> 

            <section id="eboard">
                <ACMBoard />
            </section>
            
            <section id="gallery">
                <ImageGallery />
            </section>

            <section id="sponsors">
                <Sponsors />
            </section>
        </div>
    );
}

export default General;