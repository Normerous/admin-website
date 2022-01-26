import styled from "styled-components";
import { Spin } from "antd";

const Container = styled.div`
position: absolute;
height: 100vh;
width: 100vw;
background: transparent;
top: 0;
left: 0;
z-index: 100;
display: flex;
justify-content: center;
align-items: center;
`;

export const Loading = () => <Container>
  <Spin size="large" />
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

