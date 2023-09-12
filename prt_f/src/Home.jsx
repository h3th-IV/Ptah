import Header from "./Header";
import HomeBodyLink from "./HomeBodyLink";
import useNav from "./useNav";
import Typewriter from "typewriter-effect";
import image from "./img/th0th.jpg";

function Home() {
  const { navValue } = useNav(false);

  return (
    <div className="Home">
      <Header navValue={navValue} />
      <div className="home__picAndAbout">
        <img src={image} alt="myPic" />
        <div className="home__text">
          <h1>Hello👋, I'm Samuel Bonu</h1>
          <h2 className="typewiter-effect">
            <span>Interests: </span>
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 40,
                strings: [
                  "Programming",
                  "Penetration testing",
                  "Playing Musical Instruments",
                  "Music",
                ],
              }}
            />
          </h2>
        </div>
      </div>
      <div className="home__LinksAndContactMe">
        <div>
          <HomeBodyLink to="about" text="About" />
          <HomeBodyLink to="projects" text="Projects" />
          
          <HomeBodyLink to="links" text="Links" />
        </div>

        <div className="home__contactWrapper">
          <a
            className="home__contactMe"
            href="mailto:samuelbonux10@gmail.com"
          >
            Contact Me
          </a>
          <div className="home__contactText">
            &#169; {new Date().getFullYear()} Th0th_IV.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
