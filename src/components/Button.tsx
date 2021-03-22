import styled from '@emotion/styled';
import { MotionProps, motion } from 'framer-motion';
import React from 'react';
import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  border,
  color,
  compose,
  flexbox,
  layout,
  position,
  space,
} from 'styled-system';

export type ButtonProps = BorderProps &
  ColorProps &
  FlexboxProps &
  LayoutProps &
  MotionProps &
  PositionProps &
  SpaceProps &
  React.HTMLAttributes<HTMLButtonElement>;

export const buttonStyle = compose(
  border,
  color,
  flexbox,
  layout,
  position,
  space,
);

const Button = styled(motion.button)<ButtonProps>(
  { appearance: 'button', border: 0, outline: 0 },
  buttonStyle,
);

Button.defaultProps = {
  bg: 'blue',
  borderRadius: 2,
  color: 'white',
  p: 2,
  style: { cursor: 'pointer' },
  whileTap: { scale: 0.9 },
};

export default Button;
