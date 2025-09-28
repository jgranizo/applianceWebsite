import Header from "./Header"
import Services from "./Services"
import ContactUs from "./booking/ContactUs"
export default function HomePage(){
    return(
        <>
    <div>
        <Header></Header>
    </div>
    <Services></Services>
    <div>
    <ContactUs></ContactUs>
    </div>
        </>
    )
}