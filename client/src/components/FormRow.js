import styled from 'styled-components';
const Section = styled.section`
   .input{
      border:solid 1px #ccc;
      border-radius: 10px;
   }
`
const FormRow = ({ type, name, value, handleChange, labelText,disabled }) => {
    return (
        <Section className="d-flex flex-column gap-1">
            <label htmlFor={name}>
                {labelText || name}
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