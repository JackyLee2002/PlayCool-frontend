import React, {useContext} from 'react';
import styles from './ConfirmOrder.module.css';
import {Button} from '@mui/material';
import Divider from "@mui/material/Divider";
import {AuthContext} from "@/src/context/AuthContext";

const ConfirmOrder = () => {
    const { createOrder } = useContext(AuthContext);
    const orderDetails = {
        "concertId": 9,
        "areaId":1,
        "venueId":1,
        "paymentMethod":"AILIPAY"
    }
    const confirmOder = () => {
        createOrder(orderDetails);
    }
    return (
        <div className={styles.orderSummary}>
            <div className={styles.orderSummaryTitle}>
                Order Summary
            </div>
            <div className={styles.orderSummaryItem}>
                Music of the Spheres World, 1 VIP Tickets
            </div>
            <div className={styles.orderSummaryItem}>
                <span>Subtotal</span>
                <span>$399.x1</span>
            </div>
            <Divider style={{margin: '10px 0' }} />
            <div className={styles.orderSummaryItem}>
                <span>Total USD</span>
                <span>$399.00</span>
            </div>
            <div className={styles.buttonContainer}>
                <Button
                    className={styles.backButton}
                    variant="outlined"
                    sx={{
                        borderRadius: '50px',
                        backgroundColor:"white",
                        border: '1px solid #3337BF'
                    }}
                >
                    Back
                </Button>
                <Button
                    className={styles.createOrderButton}
                    variant="contained"
                    sx={{
                        borderRadius: '50px',
                        backgroundColor:"#3337BF"
                    }}
                    onClick={confirmOder}
                >
                    Create Order
                </Button>
            </div>
        </div>
    );
};

export default ConfirmOrder;