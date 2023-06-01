import { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { getSession, useSession } from "next-auth/react";

import { GrClose } from "react-icons/gr";

const AboutEverydayAITools = () => {
  return (
    <>
      <Card>
        <CardBody>
          {" "}
          <div className="border flex items-center justify-center h-full flex-col">
            <div className="terms-wrapper">
              <div className="main-terms-wrapper">
                <div>
                  <h2>About Everyday AI Tools</h2>
                  <p>
                    Everyday AI Tools is a comprehensive SaaS product designed
                    to make the power of artificial intelligence accessible to
                    businesses of all sizes. Our user-friendly platform offers a
                    wide range of AI-driven tools and applications to automate,
                    optimize, and enhance various aspects of your daily
                    operations. Everyday AI Tools helps you gain a competitive
                    edge, save time, reduce costs, and make data-driven
                    decisions for business growth.
                  </p>
                </div>
                <div>
                  <h3>Our Mission</h3>
                  <p>
                    Everyday AI Tools mission is to empower individuals and
                    businesses by providing accessible, user-friendly, and
                    transformative SaaS solutions powered by artificial
                    intelligence. We strive to democratize AI technology,
                    fostering creativity, efficiency, and innovation in the
                    daily lives of our users. Through our commitment to
                    continuous improvement and customer-centric design, we aim
                    to become the go-to platform for AI-driven productivity and
                    growth in the digital age.
                  </p>
                </div>
                <div>
                  <h3>Our Team</h3>
                  <p>
                    Our diverse and experienced team is committed to providing
                    the best possible solutions for our clients, continually
                    updating and enhancing our platform based on user feedback
                    and industry trends.
                  </p>
                </div>
                <div>
                  <h3>Our Solution</h3>
                  <p>
                    Everyday AI Tools offers a comprehensive suite of AI-powered
                    SaaS applications designed to simplify, streamline, and
                    revolutionize the way individuals and businesses work. Our
                    platform combines cutting-edge artificial intelligence with
                    an intuitive user experience, enabling users to harness the
                    power of AI for tasks such as data analysis, content
                    creation, project management, and customer service. With
                    Everyday AI Tools, users can unlock new levels of
                    efficiency, creativity, and innovation, ultimately driving
                    success and growth in an increasingly digital world.
                  </p>
                </div>

                <div>
                  <h3>Join Us</h3>
                  <p>
                    We invite you to join the growing community of businesses
                    that are revolutionizing their approach to energy management
                    with Everyday AI Tools. Sign up today to start your journey
                    towards smarter, more sustainable energy practices and
                    unlock the potential for significant cost savings and
                    reduced carbon emissions.
                  </p>
                </div>

                <div>
                  <h3>Everyday AI Tools is a product of Visionary AI Labs</h3>
                  <h4>Visit our Website to Find out More</h4>
                  <p>
                    <a href="https://visionaryailabs.com/" target="_blank">
                      https://visionaryailabs.com/
                    </a>
                    <br />
                    <a>
                      At Visionary AI Labs, our vision is to revolutionize the
                      world through cutting-edge artificial intelligence,
                      unlocking human potential and fostering global progress.{" "}
                    </a>
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-30 w-70 "></div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default AboutEverydayAITools;

export async function getServerSideProps({ req }) {
  const session = await getSession({
    req,
  });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/loginformik",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
