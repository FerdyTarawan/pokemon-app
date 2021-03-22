import styled from '@emotion/styled';
import { MotionProps, motion } from 'framer-motion';
import React from 'react';
import {
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  TypographyProps,
  color,
  compose,
  flexbox,
  layout,
  space,
  typography,
} from 'styled-system';

export type TextProps = ColorProps &
  FlexboxProps &
  MotionProps &
  LayoutProps &
  SpaceProps &
  TypographyProps &
  React.HTMLAttributes<HTMLParagraphElement>;
export const textStyle = compose(color, flexbox, layout, space, typography);

const Text = styled(motion.p)<TextProps>(textStyle);

Text.defaultProps = {
  fontWeight: 'regular',
};

export default Text;
