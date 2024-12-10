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
    const [order, setOrder] = useState({
        concertId: 0,
        areaId: 0,
        concertName: "",
        concertDate: null,
        venueName: "",
        areaName: "",
        price: "",
        concertImage:
            "https://www.coldplay.com/wp/wp-content/uploads/2024/10/FM.webp",
    });

    useEffect(() => {
        if (!route.query.id || !router.query.selectedAreaId) {
            return;
        }

        let newOrder = {
            concertId: route.query.id,
            areaId: router.query.selectedAreaId,
            concertName: "",
            concertDate: null,
            venueName: "",
            areaName: "",
            price: "",
            concertImage:
                "https://www.coldplay.com/wp/wp-content/uploads/2024/10/FM.webp",
        };

        const fetchConcertData = fetchConcert(route.query.id).then((data) => {
            newOrder.concertName = data.title;
            newOrder.concertDate = data.dateTime;
        });

        const fetchAreaData = fetchAreaById(router.query.selectedAreaId).then(
            (data) => {
                newOrder.venueName = data.venue.name;
                newOrder.areaName = data.name;
                newOrder.price = data.price;
            }
        );

        Promise.all([fetchConcertData, fetchAreaData]).then(() => {
            setOrder(newOrder);
        });
    }, [router.query.selectedAreaId, route.query.id]);

    useEffect(() => {
    }, [order]);

    return (
        <div>
            <StepperBar index={2}/>
            <OrderDetail props={order} concertId={router.query.id}/>
            <ConfirmOrder props={order}/>
        </div>
    );
};

export default CreateOrder;
