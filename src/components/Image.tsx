import styled from '@emotion/styled';
import { MotionProps, motion } from 'framer-motion';
import React from 'react';
import {
  BordersProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  border,
  color,
  compose,
  layout,
  position,
  shadow,
  space,
} from 'styled-system';

export const imageStyle = compose(
  border,
  color,
  layout,
  position,
  shadow,
  space,
);

export type ImageProps = BordersProps &
  ColorProps &
  LayoutProps &
  MotionProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  React.HTMLAttributes<HTMLImageElement>;

const Image = styled(motion.img)<ImageProps>(imageStyle);

export default Image;
