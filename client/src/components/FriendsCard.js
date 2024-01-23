import { RxAvatar } from "react-icons/rx";
import Section from '../styles/FriendsCard';

const FriendsCard = ({ friend, onShowDetails, onShowSettleUp }) => {
    let textBodySecondary = ""
    if (friend.amount > 0) {
        textBodySecondary = `You owe ${friend.name} `
    } else if (friend.amount === 0) {
        textBodySecondary = 'Settled Up'
    } else {
        textBodySecondary = `${friend.name} owe you  `
    }
    return (
        <Section isamountzero={friend.amount === 0} payable={friend.amount > 0}>
            <div className="border border-secondary-subtle bg-white rounded-4 d-flex flex-column align-items-center">
                <div className='icon'><RxAvatar /></div>
                <h6 className='fw-bolder text-capitalize'>{friend.name}</h6>
                <h6 className='text-body-secondary'>{textBodySecondary} {friend.amount !== 0 && <span className='amount'>${Math.abs(friend.amount)}</span>}</h6>
                <button 
                    className='btn expense-btn  rounded-4 bg-primary text-white border-0 w-75 mb-1'
                    onClick={() => onShowDetails(friend)}
                >
                    {friend.amount === 0 ? 'show settled expense(s)' : 'show expense(s)'}
                </button>
                {
                    friend.amount !== 0 &&
                    <button
                        className='btn btn-sm rounded-4 bg-success  text-white border-0 w-75'
                        onClick={() => onShowSettleUp(friend)}
                    >
                        Settle Up
                    </button>
                }                
            </div>
        </Section>
    )
}
export default FriendsCard

