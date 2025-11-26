import { CircleLoader } from "react-spinners";
import styled from "styled-components";


const Wrapper = styled.div`
 ${props => props.fullWidth ? `
  display: flex;
  margin: auto;

  height: 50%;
  justify-content: center;
 ` : `
 border: ;
 `}
`;


export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <CircleLoader speedMultiplier={3} color={'#555'} />

    </Wrapper>
  );
}