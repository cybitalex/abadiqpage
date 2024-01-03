import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Link from "next/link";

export default function About() {
  const [text] = useTypewriter({
    words: ["About"],
    typeSpeed: 120,
    loop: 1,
    deleteSpeed: 80,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-between p-4 sm:p-12 lg:p-24">
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="lg:absolute lg:top-0 lg:left-0 h-48 w-full lg:h-auto lg:w-auto bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:relative lg:bg-none">
            <Link href="/" rel="noopener noreferrer">
              <a className="flex place-items-center gap-2 p-8 lg:p-0">
                <Image
                  src="/logo-no-background.svg"
                  alt="AbadIQ Logo"
                  width={100}
                  height={24}
                  priority
                />
              </a>
            </Link>
          </div>
          <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
            <h1 className="text-center font-bold text-3xl text-purple-600 mb-4">
              <span className="text-purple-600">{text}</span>{" "}
              <span className="text-white">
                <Cursor cursorStyle={"|"} />
              </span>{" "}
            </h1>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center text-center mt-12">
          <div className="max-w-3xl text-left text-gray-500 animate-fade-in">
            {/* Your content here */}
          </div>
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
