import NavBar from "@/src/components/NavBar";
import StepperBar from "@/src/components/StepperBar";
import Footer from "@/src/components/Footer";
import ConfirmOrder from "@/src/components/ConfirmOrder";
import OrderDetail from "@/src/components/OrderDetail";

const CreateOrder = () => {
    return (
        <div>
            <NavBar/>
            <StepperBar/>
            <OrderDetail/>
            <ConfirmOrder/>
            <Footer/>
        </div>
    );
}
export default CreateOrder;