import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styles from './StepperBar.module.css';

const steps = ['Choose Time', 'Choose Seat', 'Checkout', 'Get Ticket'];

const StepperBar = ({ index }) => {

    return (
        <Box className={styles.stepperBar}>
            <Stepper
                activeStep={parseInt(index)}
                alternativeLabel
                sx={{
                    '& .MuiStepIcon-root': { color: 'white', fontSize: '2rem' },
                    '& .MuiStepIcon-root.Mui-completed': { color: 'white', fontSize: '2rem' },
                    '& .MuiStepIcon-root.Mui-active': { color: 'white', fontSize: '2rem' },
                    '& .MuiStepLabel-label': { color: 'white' },
                    '& .MuiStepLabel-label.Mui-active': { color: 'white' },
                    '& .MuiStepLabel-label.Mui-completed': { color: 'white' },
                    backgroundColor: 'transparent',
                }}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>

    );
};
export default StepperBar;
