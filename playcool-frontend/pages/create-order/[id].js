import StepperBar from "@/src/components/StepperBar";
import ConfirmOrder from "@/src/components/ConfirmOrder";
import OrderDetail from "@/src/components/OrderDetail";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchAreaById, fetchConcert } from "@/src/components/api";

const CreateOrder = () => {
  const route = useRouter();
  const router = useRouter();
  const [selectedAreaId, setSelectedAreaId] = useState(1);
  const [concertId, setConcertId] = useState(0);
  const [order, setOrder] = useState({
    concerName: "",
    concertDate: null,
    venueName: "",
    areaName: "",
    price: "",
    concertImage:
      "https://www.coldplay.com/wp/wp-content/uploads/2024/10/FM.webp",
  });
  //   let order = {
  //     concerName: "",
  //     concertDate: null,
  //     venueName: "",
  //     areaName: "",
  //     price: "",
  //     concertImage:
  //       "https://www.coldplay.com/wp/wp-content/uploads/2024/10/FM.webp",
  //   };
  useEffect(() => {
    if (!route.query.id || !router.query.selectedAreaId) {
      return;
    }

    let newOrder = {
      concerName: "",
      concertDate: null,
      venueName: "",
      areaName: "",
      price: "",
      concertImage:
        "https://www.coldplay.com/wp/wp-content/uploads/2024/10/FM.webp",
    };

    console.log(route.query.id);
    console.log(router.query.selectedAreaId);

    const fetchConcertData = fetchConcert(route.query.id).then((data) => {
      newOrder.concerName = data.title;
      newOrder.concertDate = data.dateTime;
      newOrder.a = 1;
      console.log("Done first");
    });

    const fetchAreaData = fetchAreaById(router.query.selectedAreaId).then(
      (data) => {
        newOrder.venueName = data.venue.name;
        newOrder.areaName = data.name;
        newOrder.price = data.price;
        newOrder.b = 2;
        console.log("Done second");
      }
    );

    Promise.all([fetchConcertData, fetchAreaData]).then(() => {
      console.table(newOrder);
      setOrder(newOrder);
    });
  }, [router.query.selectedAreaId, route.query.id]);

  useEffect(() => {
    console.table(order);
  }, [order]);

  return (
    <div>
      <StepperBar index={2} />
      <OrderDetail props={order} concertId={router.query.id} />
      <ConfirmOrder props={route.query.id} />
    </div>
  );
};

export default CreateOrder;
