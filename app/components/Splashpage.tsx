"use client";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { BrowserRouter, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoginModal from "./employeeLogin";
import { Button } from "react-bootstrap";
const MainPage: React.FC = (): React.ReactElement | null => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [text] = useTypewriter({
    words: ["Billing", "Coding", "RCM"],
    typeSpeed: 120,
    loop: 0,
    deleteSpeed: 80,
  });
  if (typeof document !== "undefined") {
    return (
      <div className="flex flex-col min-h-screen">
        <Button
          variant="primary"
          className="ml-auto mr-3 mt-3"
          onClick={() => setIsModalOpen(true)}
        >
          Login
        </Button>
        <LoginModal show={isModalOpen} onHide={() => setIsModalOpen(false)} />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a
                // className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="/"
                rel="noopener noreferrer"
              >
                <Image
                  src="/logo-no-background.svg"
                  alt="AbadIQ Logo"
                  width={100}
                  height={24}
                  priority
                />
              </a>
            </div>
          </div>
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#7801ff] after:dark:opacity-30 before:lg:h-[360px] z-[-1]">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="/logo-frontpage.png"
              alt="AbadIQ Logo"
              width={180}
              height={37}
              priority
            />{" "}
            <h1 style={{ margin: "50px" }}>
              The best{" "}
              <span style={{ fontWeight: "bold", color: "purple" }}>
                {text}
              </span>
              <span style={{ color: "white" }}>
                <Cursor cursorStyle={"|"} />
              </span>{" "}
              services.
            </h1>
          </div>
          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            <Link
              to="/billing"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Billing{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                We offer Medical Billing Consultation Services to detect
                bottlenecks, streamline the process & help fill the gaps.
              </p>
            </Link>
            <Link
              to="/coding"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Coding{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                We offer specialist services for coding reviews and audits.
              </p>
            </Link>
            <Link
              to="/rcm"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                RCM{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                We provide end to end customized Revenue Cycle Management
                services.
              </p>
            </Link>
            <Link
              to="/about"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                About{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Learn more about Abad IQ and what we stand for.
              </p>
            </Link>
          </div>
        </main>
        <footer className="py-4 bg-gray-900 text-white text-center sticky bottom-0">
          <div className="flex items-center justify-center">
            <p className="text-gray-400">
              Created by{" "}
              <span className="text-light-blue font-semibold">CyBit</span>{" "}
              <span className="text-white font-semibold">Networks</span>
            </p>
          </div>
        </footer>
      </div>
    );
  }
  return null;
};

export default MainPage;
