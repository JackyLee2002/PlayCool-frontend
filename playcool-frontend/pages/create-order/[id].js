import StepperBar from "@/src/components/StepperBar";
import ConfirmOrder from "@/src/components/ConfirmOrder";
import OrderDetail from "@/src/components/OrderDetail";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {fetchAreaById, fetchConcert} from "@/src/components/api";

const CreateOrder = () => {
    const route = useRouter();
    const router = useRouter();
    const [selectedAreaId, setSelectedAreaId] = useState(1);
    const [concertId, setConcertId] = useState(0);
    const order = {
        concerName: "",
        concertDate: null,
        venueName: "",
        areaName: "",
        price: "",
        concertImage: "https://www.coldplay.com/wp/wp-content/uploads/2024/10/FM.webp"
    }
    useEffect(() => {
        if (!route.query.id) {
            return;
        }
        if (!router.query.selectedAreaId) {
            return;
        }
        setConcertId(route.query.id);
        setSelectedAreaId(router.query.selectedAreaId);
        if (concertId) {
            fetchConcert(concertId).then((data) => {
                order.concerName = data.title;
                order.concertDate = data.dateTime;
            })
        }
        if (selectedAreaId) {
            fetchAreaById(selectedAreaId).then((data) => {
                order.venueName = data.venue.name;
                order.areaName = data.name;
                order.price = data.price;
            }, [router]);
        }
}, [router, concertId, selectedAreaId]);
    return (<div>
        <StepperBar index={2}/>
        <OrderDetail props={order}/>
        <ConfirmOrder props={concertId}/>
    </div>);}

export default CreateOrder;