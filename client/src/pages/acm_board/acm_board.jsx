import ManavMoney from '../../assets/ManavMoney.png'
import EthanChau from '../../assets/ethan_chau.png'
import BenSullins from '../../assets/ben_sullins.png'
import DheerajM from '../../assets/dheeraj_m.png'
import './acm_board.css'

const boardMembers = [
    {
        name: 'Manav Vinotha',
        position: 'President',
        image: ManavMoney,
    },
    {
        name: 'Ethan Chau',
        position: 'Vice President',
        image: EthanChau,
    },
    {
        name: 'Ben Sullins',
        position: 'Logistics Officer',
        image: BenSullins,
    },
    {
        name: 'Dheeraj M',
        position: 'Treasurer',
        image: DheerajM,
    },
]

function ACMBoard() {
    return (
        <div>
            <div className="board-container">
                <h1 className="board-title">
                    Introducing, <br />ACM General Executive Board
                </h1>
                <div className="board-grid">
                    {boardMembers.map((member, index) => (
                        <div key={index} className="member-card">
                            <div className="diamond-shape">
                                <img src={member.image} alt={member.name} />
                            </div>
                            <div>
                                <p className="member-name">{member.name}</p>
                                <p className="member-position">{member.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ACMBoard;
