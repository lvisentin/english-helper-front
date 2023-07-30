import InputMask from 'react-input-mask';
import TextField from '../TextField/TextField';

function PhoneInput(props: any) {
  return (
    <InputMask {...props}>
      {(inputProps: any) => <TextField {...inputProps} />}
    </InputMask>
  );
}

export default PhoneInput;
