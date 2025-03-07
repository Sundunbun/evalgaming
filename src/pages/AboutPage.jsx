import React from "react";
import sekouHead from "../assets/sekou-head.png";
import tylerHead from "../assets/tyler-head.png";
import ryanHead from "../assets/ryan-head.jpeg";
import evalTeam from "../assets/people.png";
import ericaImage from "../assets/erica.png";
import charlesImage from "../assets/charles.png";
import ibraheemImage from "../assets/ibraheem.png";

const founders = [
  {
    name: "Sekou Roland",
    role: "Founder, CEO",
    image: sekouHead,
    quote:
      "It's more than a game. Video games are powerful—they inspire, connect, and bring people together. With Eval, kids are getting an education while doing something they love."
  },
  {
    name: "Tyler Morris",
    role: "Founder, CCO",
    image: tylerHead,
    quote:
      "As Division I athletes, we understand the dedication and commitment it takes to achieve your dreams. Our hope is that Eval can help someone else do the same."
  },
  {
    name: "Ryan Divan",
    role: "Founder, CTO",
    image: ryanHead,
    quote:
      "Gaming has always been about community. We're building technology that brings players together and creates opportunities for the next generation."
  },
  {
    name: "Erika Yeung",
    role: "Chief Marketing Officer (CMO)",
    image: ericaImage,
    quote: "Marketing is all about storytelling. At Eval, we're creating a narrative where gaming talent meets real-world opportunities."
  },
  {
    name: "Charles Muehlberger",
    role: "Software Developer",
    image: charlesImage,
    quote: "Tech should empower, not exclude. Eval is all about bridging the gap between talent and opportunity through technology."
  },
  {
    name: "Ibraheem Amin",
    role: "Software Engineer",
    image: ibraheemImage,
    quote: "Data tells the story of performance. At Eval, we're making sure every player’s journey is backed by analytics and insight."
  }
];

const AboutPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Mission Section */}
        <section className="flex flex-col items-center text-center py-20">
          <p className="text-lg font-semibold uppercase text-gray-300 tracking-wide mb-4">
            OUR MISSION
          </p>
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            CONNECTING <span className="text-purple-500">GAMERS</span>
            <br />
            <span className="text-6xl">TO <span className="text-purple-500">COLLEGE</span> SCHOLARSHIPS</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mt-6">
            Eval bridges the gap between gaming and higher education by evaluating
            player performance, showcasing talent, and connecting gamers with scholarship
            opportunities. Through curated leaderboards, power rankings, and
            data-driven insights, Eval highlights the best players and helps them
            get noticed by colleges and organizations offering scholarships.
          </p>
        </section>

        {/* Story Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 py-16">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-5xl font-bold text-purple-500 mb-4">Our Story</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              As current <i>D1 athletes and gamers at Princeton</i>, we understand the challenges
              of recruitment and the dedication it takes to stand out. That's why we've
              created EvalGaming: a platform where you can showcase your skills,
              achievements, and drive to coaches and recruiters actively searching
              for players like you.
            </p>
          </div>
          <img src={evalTeam} alt="Eval Team" className="w-full max-w-lg rounded-lg" />
        </section>

        {/* Founders Section */}
        <section className="text-center py-16">
          <h2 className="text-5xl font-bold text-purple-500 mb-12">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {founders.map((founder, index) => (
              <div key={index} className="max-w-xs text-center">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-40 h-40 object-cover rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">{founder.name}</h3>
                <p className="text-purple-500 text-sm">{founder.role}</p>
                <p className="text-gray-300 mt-3 italic">"{founder.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join Now Section */}
        <section className="text-center py-16">
          <h2 className="text-4xl font-bold text-purple-500 mb-6">
            Start Your Journey
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Creating an Eval profile is <span className="text-purple-500 font-bold">completely free</span>.
            Start today—chase your dreams, share your talents, and let EvalGaming help you
            get the <span className="text-purple-500 font-bold">opportunities you deserve!</span>
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition-all duration-300"
          >
            Join Now
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
