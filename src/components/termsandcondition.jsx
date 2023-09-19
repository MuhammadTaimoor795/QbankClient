import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const TermsAndConditionsPage = () => {
    return (
        <div className="container mx-auto p-4 mb-16 mt-6">
            <div className="text-center py-5" style={{ backgroundColor: "rgb(6, 101, 166)", borderRadius: 8 }}>

                <h1 style={{
                    lineHeight: '1.25em',
                    margin: '1.3rem 0 1.3rem',
                    color: '#222',
                    fontSize: '40px',
                    fontFamily: "Poppins",
                    color: "#fff",
                    letterSpacing: '1.5px',
                    fontWeight: 600
                }}>Privacy Policy / Terms</h1>

<Link to="/">

     <Button style={{ backgroundColor: "#1677ff" }} type="primary" key="console">
        Return To Homepage
      </Button>
     </Link>            </div>

            <br />

            {/* <Title level={3} style={{fontFamily:"Poppins", fontSize:16}}>1. Introduction</Title> */}
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                Thank you for visiting this site. This Privacy Policy outlines how we collect, use, disclose, and protect the information you provide while using our website. By accessing or using our website, you consent to the practices described in this policy.
            </Paragraph>

            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>1. Information We Collect</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                <strong style={{ fontFamily: "Poppins", fontSize: 14, color: "rgb(6, 101, 166)" }}>a. Personal Information:</strong> We may collect personal information such as your name, email address, and any other information you voluntarily provide when you sign up for our newsletter, create an account, participate in surveys, or communicate with us.
            </Paragraph>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                <strong style={{ fontFamily: "Poppins", fontSize: 14, color: "rgb(6, 101, 166)" }}>b. Usage Information:</strong> We automatically collect certain information about your device, browser, and usage patterns when you visit our website. This includes your IP address, browser type, referring website, pages viewed, and the time spent on our site.
            </Paragraph>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                <strong style={{ fontFamily: "Poppins", fontSize: 14, color: "rgb(6, 101, 166)" }}>c. Cookies and Similar Technologies:</strong> We use cookies and similar technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us recognize your preferences and track your activities.
            </Paragraph>

            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>2. How We Use Your Information</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                We use the collected information for the following purposes:
            </Paragraph>
            <ul className='ml-5'>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>To provide and improve our educational content and services.</li>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>To personalize your experience on our website.</li>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>To send you relevant educational updates, newsletters, and promotional materials.</li>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>To respond to your inquiries and provide customer support.</li>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>To monitor and analyze website usage to improve our content and user experience.</li>
            </ul>

            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>3. How We Share Your Information</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
            </Paragraph>
            <ul className='ml-5'>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>With trusted service providers who assist us in operating our website and delivering our services.</li>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>In response to legal requests or to comply with applicable laws and regulations.</li>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>To protect our rights, privacy, safety, or property, or that of others.</li>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>With your consent, to fulfill any other purpose disclosed at the time of data collection.</li>
            </ul>

            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>4. Third-Party Links</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                Our website may contain links to third-party websites or services that are not under our control. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of those websites before using them.
            </Paragraph>

            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>5. Data Security</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                We implement reasonable security measures to protect the information we collect. However, please be aware that no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute data security.
            </Paragraph>

            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>6. Your Choices</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                You can update your personal information and communication preferences by logging into your account or contacting us directly. You can also opt-out of receiving promotional emails by following the instructions provided in each email.
            </Paragraph>

            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>7. Children's Privacy</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                Our website is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us to have it removed.
            </Paragraph>

            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>8. Changes to This Privacy Policy</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and the revised date will be noted at the top. We encourage you to review this page periodically for the latest information on our privacy practices.
            </Paragraph>

            


            {/* <br /> */}
            {/* <br />
            <br />



            <div className="text-center py-5" style={{ backgroundColor: "rgb(6, 101, 166)", borderRadius: 8 }}>

                <h1 style={{
                    lineHeight: '1.25em',
                    margin: '0 0 1.3rem',
                    color: '#222',
                    fontSize: '40px',
                    fontFamily: "Poppins",
                    color: "#fff",
                    letterSpacing: '1.5px',
                    fontWeight: 600
                }}>Terms Of Use</h1>
            </div>

            <br /> */}

            {/* <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please refrain from using our website and services.
            </Paragraph> */}

            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>9. Use of Content and Services</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                <strong style={{ fontFamily: "Poppins", fontSize: 14, color: "rgb(6, 101, 166)" }}>a. Content Disclaimer:</strong> The educational content provided on our website is for informational purposes only. It should not be considered professional advice or relied upon for real-world applications. While we strive to provide accurate and up-to-date information, we make no representations or warranties regarding the accuracy, completeness, or reliability of the content.
            </Paragraph>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                <strong style={{ fontFamily: "Poppins", fontSize: 14, color: "rgb(6, 101, 166)" }}>b. No Responsibility for Content:</strong> We are not responsible for any consequences resulting from the use of our content, including but not limited to decisions made based on the information provided. The use of our content is at your own risk.
            </Paragraph>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                <strong style={{ fontFamily: "Poppins", fontSize: 14, color: "rgb(6, 101, 166)" }}>c. Not for Real-World Applications:</strong> You acknowledge and agree that the information and content provided on our website should not be used as a substitute for professional advice or relied upon in real-world scenarios. Always seek the advice of qualified professionals in specific situations.
            </Paragraph>


            <br />

            <Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>10. Indemnification</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
                You agree to indemnify, defend, and hold us harmless from any claims, liabilities, damages, losses, or expenses (including legal fees) arising out of or related to:
            </Paragraph>
            <ul className='ml-5'>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>Your use of our website, content, or services.</li>
                <li style={{ fontFamily: "Poppins", color: "rgba(0, 0, 0, 0.88)", fontSize: 14 }}>Your violation of these Terms of Use or any applicable laws or regulations.</li>

            </ul>
            <br />

<Title level={3} style={{ fontFamily: "Poppins", fontSize: 16, color: "rgb(6, 101, 166)" }}>11. Contact Us</Title>
<Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us.
</Paragraph>

<br />
<br />
{/* <br /> */}


<Title level={2} style={{ fontFamily: "Poppins", fontSize: 20, color: "rgb(6, 101, 166)", fontWeight: 800 }}>NOTE:</Title>
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
            The services/content provided by the Website are offered on an 'as-is' basis. By engaging in the use of our services/content, you acknowledge and agree that the Website shall not be held responsible for any direct, indirect, incidental, consequential, or exemplary damages, even in the event of the Website being advised of the possibility of such damages, resulting from the use or inability to use our services. We make no guarantees, representations, or warranties, either expressed or implied, about the reliability, accuracy, timeliness, completeness, or suitability of the services/content provided. The use of our services/content is solely at your own risk. Users release the creators and providers of service/content from any claims or any kind of damage. Users agree to indemnify and hold the service/content provider harmless, assuming responsibility for compensating and protecting the service/content provider against any legal claims, liabilities, and expenses, including reasonable attorneys' fees, arising from their use or inability to use the service/content. The Website has a policy of no refunds after payment. Information provided through this publication holds no warranty of accuracy, correctness, or truth. The author, publisher, compilers, and all other parties involved in this work disclaim all responsibility from any errors contained within this work and from the results from the use of this information.
            </Paragraph>
            <br />
            <Paragraph style={{ fontFamily: "Poppins", fontSize: 14 }}>
            &copy; All Rights Reserved - Our organization responds to clear notices of alleged copyright infringement. In accordance with the Digital Millennium Copyright Act (DCMA), we adopted a policy toward copyright infringement. Pursuant to Section 512(c)(3) of the Digital Millennium Copyright Act, email to <a href="mailto:info@ezlearningprep.com" style={{color:"rgb(6, 101, 166)", textDecoration:"underline"}}>info@ezlearningprep.com</a> a description of your work that you believe has been infringed, URL(s) of the allegedly infringing content, your contact information, statement of accurate information is being provided, and your signature.
            </Paragraph>


        </div>
    );
};

export default TermsAndConditionsPage;
