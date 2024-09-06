import { Link } from "react-router-dom";
import teamImage from "../assets/sepatu3.jpg"; 
import missionImage from "../assets/sepatu4.png"; 

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-900">About Us</h1>

        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={teamImage}
                alt="Our Team"
                className="rounded-lg shadow-lg object-cover h-72 w-full md:h-96"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
              <p className="text-lg leading-relaxed">
                We are a passionate team dedicated to delivering the best products and services to our customers.
                With years of experience in the industry, we believe in the power of collaboration, innovation, and
                customer satisfaction. Our goal is to create solutions that not only meet but exceed expectations.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-center">Our Mission</h2>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 md:pr-12">
              <p className="text-lg leading-relaxed">
                Our mission is to empower businesses and individuals through cutting-edge technology and user-centric
                design. We strive to create products that not only solve problems but also enhance the quality of life
                for our users. Every project we undertake is guided by our commitment to excellence, integrity, and
                customer focus.
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src={missionImage}
                alt="Our Mission"
                className="rounded-lg shadow-lg object-cover h-72 w-full md:h-96"
              />
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Us on Our Journey</h2>
          <p className="text-lg leading-relaxed mb-8">
            We are always looking for passionate and talented individuals to join our team. Whether you're a
            seasoned professional or just starting your career, we offer a dynamic and supportive environment where
            you can grow and make an impact.
          </p>
          <Link
            to="/careers"
            className="inline-block bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-600"
          >
            Explore Careers
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
