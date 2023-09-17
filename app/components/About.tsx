"use client";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

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
            <Link
              className="flex place-items-center gap-2 p-8 lg:p-0"
              to="/"
              rel="noopener noreferrer"
            >
              <Image
                src="/logo-no-background.svg"
                alt="AbadIQ Logo"
                width={100}
                height={24}
                priority
              />
            </Link>
          </div>
          <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
            <h1
              style={{
                margin: "20px 0 40px",
                textAlign: "center",
                fontSize: 30,
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  color: "purple",
                  textAlign: "center",
                }}
              >
                {text}
              </span>
              <span style={{ color: "white" }}>
                <Cursor cursorStyle={"|"} />
              </span>{" "}
            </h1>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center text-center mt-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-purple-600 mb-4">
              Elevating Healthcare Revenue: Abad IQ Medical Billing
            </h2>
            <div className="text-left text-gray-500 animate-fade-in">
              <p className="mb-4">
                Abad IQ is a trailblazing leader in modern medical billing
                services, dedicated to revolutionizing the financial health of
                healthcare providers. We bring a synergy of cutting-edge
                technology, expert professionals, and unmatched commitment to
                every aspect of the billing journey. Our mission? To optimize
                revenue cycles seamlessly, ensuring providers focus on patient
                care while we drive financial success.
              </p>
              <p className="mb-4">
                At the heart of Abad IQ&apos;s approach is our unwavering
                commitment to accuracy and transparency. Our certified coders,
                armed with unparalleled expertise in medical coding, decipher
                complex procedures, diagnoses, and services into standardized
                codes. This meticulous process ensures that claims are submitted
                flawlessly, reducing claim denials and accelerating
                reimbursement.
              </p>
              <p className="mb-4">
                Our process is a symphony of precision and innovation. We
                commence with thorough patient registration and insurance
                verification, setting the stage for an untroubled billing
                experience. Harnessing advanced billing software, we generate
                comprehensive claims with an acute eye for detail. These claims
                undergo rigorous scrutiny before electronic submission to
                insurance companies, expediting the processing time.
              </p>
              <p className="mb-4">
                In the intricate dance of revenue cycle management, Abad IQ
                shines as your partner for seamless financial operations. We
                navigate complexities with ease, expertly managing claim denials
                through strategic analysis and timely resubmission. Our
                meticulous payment posting and reconciliation ensure revenue is
                tracked with utmost precision, mitigating revenue leakage.
              </p>
              <p className="mb-4">
                But it&apos;s not just about numbers—it&apos;s about people.
                Patient invoicing is transformed into a transparent conversation
                through clear and detailed statements. We foster trust by
                elucidating services rendered, billed amounts, and insurance
                adjustments. Our robust reporting and analytics empower
                providers with actionable insights, illuminating financial
                trends, and areas for enhancement.
              </p>
              <p>
                Abad IQ stands as a beacon of excellence in medical billing,
                passionately committed to elevating the financial health of
                healthcare providers. With every claim meticulously coded, every
                denial strategically managed, and every invoice transparently
                communicated, we redefine medical billing as an art of precision
                and a science of success.
              </p>
            </div>
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
