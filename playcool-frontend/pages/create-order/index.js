import NavBar from "@/src/components/NavBar";
import StepperBar from "@/src/components/StepperBar";
import Footer from "@/src/components/Footer";
import ConfirmOrder from "@/src/components/ConfirmOrder";

const CreateOrder = () => {
    return (
        <div>
            <NavBar/>
            <StepperBar/>
            <ConfirmOrder/>
            <Footer/>
        </div>
    );
}
export default CreateOrder;