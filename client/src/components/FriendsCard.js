import styled from 'styled-components';
import { RxAvatar } from "react-icons/rx";

const Section = styled.section`
    @media (min-width: 640px) {
        .border{
            height: 42vh;
            width: 15vw;
        }

        .icon{
            font-size: 15vh;
        }
        .btn{
            font-size: smaller;
        }
        .text-body-secondary{
            font-size: smaller;
        }
    }
   
`;
const FriendsCard = ({ friend, onShowDetails, onShowSettleUp }) => {
    let textBodySecondary = ""
    if (friend.amount > 0) {
        textBodySecondary = `You owe ${friend.name} $${Math.abs(friend.amount)} `
    } else if (friend.amount === 0) {
        textBodySecondary = 'settle up'
    } else {
        textBodySecondary = `${friend.name} owe you $${Math.abs(friend.amount)} `
    }
    return (
        <Section>
            <div className="border border-secondary-subtle bg-white rounded-4 d-flex flex-column align-items-center">
                <div className='icon'><RxAvatar /></div>
                <h6 className='fw-bolder'>{friend.name}</h6>
                <h6 className='text-body-secondary'>{textBodySecondary}</h6>
                <button 
                    className='btn btn-sm rounded-4 bg-primary text-white border-0 w-75 mb-1'
                    onClick={() => onShowDetails(friend)}
                >
                    {friend.amount === 0 ? 'show settled expense(s)' : 'show expense(s)'}
                </button>
                <button
                    className='btn btn-sm rounded-4 bg-success  text-white border-0 w-75'
                    onClick={() => onShowSettleUp(friend)}
                >
                    Settle Up
                </button>
            </div>
        </Section>
    )
}
export default FriendsCard

