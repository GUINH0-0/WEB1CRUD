import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; 

const ParticlesComponent = (props) => {

  const [init, setInit] = useState(false);
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {

      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };


  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 100,
          },
        },
      },
      particles: {
        color: {
          value: "#1f1e1d",
          width: 100
        },
        links: {
          color: "#9500ff",
          distance: 100,
          enable: true,
          opacity: 0.0,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 10,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 500,
        },
        opacity: {
          value: 0.03,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 10, max: 200 },
        },
      },
      detectRetina: true,
    }),
    [],
  );


  return (
    <Particles
      id={props.id}
      init={particlesLoaded}
      options={options}
      style={{
        position: "absolute", // Ensure absolute positioning
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Place in the background
      }}
    />
  );
}; 
export default ParticlesComponent;