import BannerHeader from "../ui/BannerHeader";
import ContactInfo from "./ContactInfo";
const Contact = () => {


  return (
    <div>
      <BannerHeader 
        title="Contact Us" 
        description="Get in touch with us for any inquiries or support." 
      />
      <ContactInfo />
    </div>
  );
};

export default Contact;