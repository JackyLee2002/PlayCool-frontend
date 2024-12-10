import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styles from './StepperBar.module.css';

const steps = ['Choose Time', 'Choose Seat', 'Checkout', 'Get Ticket'];

const StepperBar = (index) => {
    return (
        <Box className={styles.stepperBar}>
            <Stepper activeStep={index} alternativeLabel sx={{
                '& .MuiStepIcon-root': {fontSize: '2rem'},
                '& .MuiStepIcon-root.Mui-completed': {color: 'black', fontSize: '2rem'},
                '& .MuiStepIcon-root.Mui-active': {color: 'black', fontSize: '2rem'}
            }}>
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
