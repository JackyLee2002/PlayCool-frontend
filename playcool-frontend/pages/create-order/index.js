import StepperBar from "@/src/components/StepperBar";
import ConfirmOrder from "@/src/components/ConfirmOrder";
import OrderDetail from "@/src/components/OrderDetail";

const CreateOrder = () => {

    return (<div>
            <StepperBar/>
            <OrderDetail/>
            <ConfirmOrder/>
        </div>);
}


export default CreateOrder;