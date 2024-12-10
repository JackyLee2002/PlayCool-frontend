import React, {useContext} from 'react';
import styles from './ConfirmOrder.module.css';
import {Button} from '@mui/material';
import Divider from "@mui/material/Divider";
import {AuthContext} from "@/src/context/AuthContext";
import {fetchConcert} from "@/src/components/api";
import {useRouter} from "next/router";

const ConfirmOrder = ({props}) => {
    const router = useRouter();
    const {createOrder} = useContext(AuthContext);

    const getVenueId = (concertId) => {
        fetchConcert(concertId).then((data) => {
            return data.venue.venueId;
        });
    }
    const confirmOder = () => {
        let venueId = getVenueId(props.concertId);
        createOrder({
            concertId: props.concertId, areaId: props.areaId, venueId: venueId
        }).then((data) => {
            console.log(data);
            router.push(`/snap-order/${data.orderId}`)
        });


    }
    return (<div className={styles.orderSummary}>
        <div className={styles.orderSummaryTitle}>
            Order Summary
        </div>
        <div className={styles.orderSummaryItem}>
            {props.concertName}, {props.areaName} Ticket x1
        </div>
        <div className={styles.orderSummaryItem}>
            <span>Subtotal</span>
            <span>${props.price}</span>
        </div>
        <Divider style={{margin: '10px 0'}}/>
        <div className={styles.orderSummaryItem}>
            <span>Total USD</span>
            <span>${props.price}</span>
        </div>
        <div className={styles.buttonContainer}>

            <Button
                className={styles.backButton}
                variant="outlined"
                sx={{
                    borderRadius: '50px', backgroundColor: "white", border: '1px solid #3337BF'
                }}
                onClick={() => {
                    router.push(`/concert-detail/${props.concertId}`)
                }}
            >
                Back
            </Button>

            <Button
                className={styles.createOrderButton}
                variant="contained"
                sx={{
                    borderRadius: '50px', backgroundColor: "#3337BF"
                }}
                onClick={confirmOder}
            >
                Create Order
            </Button>
        </div>
    </div>);
};

export default ConfirmOrder;