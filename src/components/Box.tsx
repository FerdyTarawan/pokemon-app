import styled from '@emotion/styled';
import { MotionProps, motion } from 'framer-motion';
import React from 'react';
import {
  BordersProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  border,
  color,
  compose,
  flexbox,
  layout,
  position,
  shadow,
  space,
} from 'styled-system';

export type BoxProps = BordersProps &
  ColorProps &
  FlexboxProps &
  LayoutProps &
  MotionProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  React.HTMLAttributes<HTMLDivElement>;

export const boxStyle = compose(
  border,
  color,
  flexbox,
  layout,
  position,
  shadow,
  space,
);

const Box = styled(motion.div)<BoxProps>(
  {
    boxSizing: 'border-box',
    display: 'flex',
    minWidth: 0,
  },
  boxStyle,
);

Box.defaultProps = {
  flexDirection: 'column',
};

export default Box;
