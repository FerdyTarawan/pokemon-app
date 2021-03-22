import React from 'react';

import Box, { BoxProps } from 'components/Box';

interface CardProps extends BoxProps {
  disableHoverAnimation?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  disableHoverAnimation,
  ...props
}) => {
  return (
    <Box
      animate={{ opacity: 1 }}
      borderRadius={2}
      boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      initial={{ opacity: 0 }}
      p={1}
      whileHover={{ scale: disableHoverAnimation ? 1 : 1.1 }}
      {...props}
    >
      {children}
    </Box>
  );
};

Card.defaultProps = {
  disableHoverAnimation: false,
};

export default Card;
