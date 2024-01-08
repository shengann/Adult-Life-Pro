import styled from 'styled-components';

const Section = styled.section`
   .input {
      border: solid 1px #ccc;
      border-radius: 10px;
      width: ${(props) => props.width};
      text-align: ${(props) => props.textalign};
   }
`;

const FormRow = ({ type, name, value, handleChange, labelText, disabled, width, textalign }) => {

    return (
        <Section className="d-flex flex-column gap-1" width={width} textAlign={textalign}>
            <label htmlFor={name}>
                {labelText }
            </label>
            <input
                type={type}
                value={value}              
                name={name}
                onChange={handleChange}
                className='input'
                disabled={disabled}
            />
        </Section>
    )
}
export default FormRow