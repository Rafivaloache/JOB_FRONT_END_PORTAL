import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <CircularProgress size="3rem" aria-label="Loading…" />
        </div>
    );
};

export default LoadingSpinner;
