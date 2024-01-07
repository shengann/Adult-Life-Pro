import styled from 'styled-components';

const Section = styled.section`
   .input {
      border: solid 1px #ccc;
      border-radius: 10px;
      width: ${(props) => props.width};
      text-align: ${(props) => props.textAlign};
   }
`;

const FormRow = ({ type, name, value, handleChange, labelText, disabled, width, textAlign }) => {

    return (
        <Section className="d-flex flex-column gap-1" width={width} textAlign={textAlign}>
            <label htmlFor={name}>
                {labelText }
            </label>
            <input
                type={type}
                value={value}              
                id={name}
                onChange={handleChange}
                className='input'
                disabled={disabled}
            />
        </Section>
    )
}
export default FormRow