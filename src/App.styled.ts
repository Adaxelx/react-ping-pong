import styled from "styled-components";
import { canvasWidth } from "./PingPongBoard/constants";

export const Wrapper = styled.div`
  width: ${canvasWidth}px;
  padding: 16px;
`;

export const BottomBar = styled.div`
  width: 100$;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TimerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  width: 100px;
  padding: 4px 8px;
`;
