import styled from 'styled-components';
import { RxAvatar } from "react-icons/rx";

const Section = styled.section`
    @media (min-width: 640px) {
        .border{
            height: 37vh;
            width: 13vw;
        }

        .icon{
            font-size: 15vh;
        }
        .button{
            height: 5vh;
            font-size: smaller;
        }
        .text-body-secondary{
            font-size: smaller;
        }
    }
   
`;
const FriendsCard = () => {
    return (
        <Section>
            <div className="border border-secondary-subtle bg-white rounded-2 d-flex flex-column align-items-center">
                <div className='icon'><RxAvatar /></div>
                <h6 className='fw-bolder'>Ali</h6>
                <h6 className='text-body-secondary'>You Own Ali $500</h6>
                <button className='button rounded-3 bg-primary text-white border-0 w-75'>show settled Expense</button>
            </div>
        </Section>
    )
}
export default FriendsCard

