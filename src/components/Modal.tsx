import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { ReactComponent as Close } from 'assets/close.svg';
import Box, { BoxProps } from 'components/Box';

export interface ModalProps extends BoxProps {
  isOpen: boolean;
  handleClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  handleClose,
  isOpen,
  ...props
}) =>
  isOpen ? (
    <AnimatePresence>
      <Box
        alignItems="center"
        animate={{ top: '0%' }}
        bg="rgba(0, 0, 0, 0.3)"
        exit={{ top: '-50%' }}
        height="100%"
        initial={{ top: '-50%' }}
        justifyContent="center"
        left={0}
        position="fixed"
        top={0}
        width={1}
      >
        <Box
          bg="concrete"
          borderRadius={2}
          height="50%"
          p={3}
          width={[3 / 4, 1 / 2]}
          {...props}
        >
          <Box
            alignSelf="flex-end"
            mb={2}
            onClick={handleClose}
            style={{ cursor: 'pointer' }}
          >
            <Close height={20} width={20} />
          </Box>
          {children}
        </Box>
      </Box>
    </AnimatePresence>
  ) : null;

export default Modal;
