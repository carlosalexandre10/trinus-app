import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #56688c;
  border-radius: 10px;
  border: 2px solid #56688c;
  padding: 16px;
  width: 100%;
  color: #7d96bf;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #00008f;
      border-color: #00008f;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #00008f;
    `}

  input {
    color: #fff;
    flex: 1;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #7d96bf;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
