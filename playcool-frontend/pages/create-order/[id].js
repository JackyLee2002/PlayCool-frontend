import StepperBar from "@/src/components/StepperBar";
import ConfirmOrder from "@/src/components/ConfirmOrder";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const CreateOrder = () => {
    const route = useRouter();
    const router = useRouter();
    const [selectedAreaId, setSelectedAreaId] = useState(1);
    const [concertId, setConcertId] = useState(0);
    const order = {
        concertId: concertId,
        selectedAreaId: selectedAreaId
    };
    useEffect(() => {
        if (!route.query.id) {
            return;
        }
        if (!router.query.selectedAreaId) {
            return;
        }
        setConcertId(route.query.id);
        setSelectedAreaId(router.query.selectedAreaId);
        order.concertId = route.query.id;
        order.selectedAreaId = router.query.selectedAreaId;
        // console.log(order);
    }, [router]);

    return (<div>
        <StepperBar index={2}/>
        {/*<OrderDetail props={order}/>*/}
        <ConfirmOrder/>
    </div>);
}


export default CreateOrder;