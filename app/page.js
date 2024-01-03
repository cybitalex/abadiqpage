"use client";
import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./styles.css";
import Billing from "./hosting/pages/Billing";
import MainPage from "./components/Splashpage";
import About from "./hosting/pages/about";
import Coding from "./hosting/pages/Coding";
import RCM from "./hosting/pages/RCM";

export default function App() {
  if (typeof document !== "undefined") {
    return (
      <Router>
        <Content />
      </Router>
    );
    function Content() {
      const location = useLocation();

      const [displayLocation, setDisplayLocation] = useState(location);
      const [transitionStage, setTransitionStage] = useState("fadeIn");

      useEffect(() => {
        if (location !== displayLocation) setTransitionStage("fadeOut");
      }, [location, displayLocation]);

      // if (typeof window === "undefined") {
      //   setTransitionStage("fadeIn");
      //   setDisplayLocation(location);
      // }

      useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
          setTransitionStage("fadeOut");
          setTimeout(() => {
            setTransitionStage("fadeIn");
            setDisplayLocation(location);
          }, 500); // Adjust the delay as needed
        }
      }, [location, displayLocation]);

      return (
        <div
          className={`${transitionStage}`}
          onAnimationEnd={() => {
            if (transitionStage === "fadeOut") {
              setTransitionStage("fadeIn");
              setDisplayLocation(location);
            }
          }}
        >
          <Routes location={displayLocation}>
            <Route path="/" element={<MainPage />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/rcm" element={<RCM />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      );
    }
  }
}
