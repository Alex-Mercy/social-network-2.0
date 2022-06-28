import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

type LoaderProps = {
    children: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({children}) => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular">
        {children}
      </Skeleton>
      
    </Stack>
  );
}

export default Loader;