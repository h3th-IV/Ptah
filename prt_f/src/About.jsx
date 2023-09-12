import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import useNav from "./useNav";

function About() {
  const { navValue } = useNav(true);
  return (
    <div className="About">
      <Header navValue={navValue} />
      <h1>About</h1>
      <p>
        Hello, my name is Samuel Bonu. I am currently studying at
        Lagos State University, where I am pursuing a degree in Computer
        Science. I have developed a strong foundation in programming languages
        such as Python and C, also well learned about the linux operating
        system and i also undertsand the concept of computer networks.
      </p>
      <p>
        I am very interested in pursuing a career in the cyber security industry and
        am excited to continue learning and growing as a professional. I am a
        proactive and detail-oriented individual, with excellent problem-solving
        and communication skills. I am confident that my education, experience,
        and skills make me well-suited for a career in the cyber security industry,
        and I am eager to contribute to the success of the industry.
      </p>

      <h1>Languages & tools</h1>
      <p>
        Here are some of the tools and technologies I have worked with over the
        past year; majorly or not (in no particular order):
      </p>

      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>Python</li>
        <li>JavaScript</li>
        <li>C</li>
        <li>Git</li>
      </ul>
      <Footer navValue={navValue} />
    </div>
  );
}

export default About;
