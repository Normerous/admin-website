import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: absolute;
  left: calc(50% - 25px);
  top: calc(50% - 25px);
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 2px solid #557571;
  border-right: 2px solid #557571;
  border-bottom: 2px solid #557571;
  border-left: 4px solid #D49A89;
  background: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Container = styled.div`
position: absolute;
height: 100vh;
width: 100vw;
background: transparent;
top: 0;
left: 0;
`;

export const Loading = () => <Container>
    <Spinner />
</Container>;

export const Button = styled.button`
  background: ${props => props.outline ? '#F4F4F4' : '#F7D1BA'};
  color: ${props => props.outline ? '#557571' : '#557571'};

  font-size: 16px;
  padding: 5px 10px;
  border: 2px solid ${props => props.outline ? '#557571' : '#557571'};
  border-radius: 10px;
  cursor: pointer;
`;

