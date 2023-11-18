"use client";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

export default function RCM() {
  const [text] = useTypewriter({
    words: ["Revenue Cycle Management"],
    typeSpeed: 120,
    loop: 1,
    deleteSpeed: 80,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
              Streamlining the Revenue Cycle
            </h2>
            <br />
            <div className="text-left text-gray-500 animate-fade-in">
              <p>
                At Abad IQ, we specialize in comprehensive Revenue Cycle
                Management (RCM) services that optimize the financial
                performance of healthcare practices. Our RCM process encompasses
                every stage of the patient&apos;s journey, from appointment
                scheduling to final payment collection.
              </p>
              <br />
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <span className="font-semibold">Appointment Scheduling:</span>{" "}
                  The RCM process begins with efficient appointment scheduling
                  and patient registration. Accurate collection of patient data
                  and insurance information sets the groundwork for a smooth
                  financial journey.
                </li>
                <li>
                  <span className="font-semibold">
                    Eligibility Verification:
                  </span>{" "}
                  Before providing services, we verify patient insurance
                  coverage and eligibility. This step ensures that services are
                  covered, minimizing claim denials and reducing payment delays.
                </li>
                <li>
                  <span className="font-semibold">Claims Submission:</span> Our
                  team uses advanced billing software to generate and submit
                  accurate claims to insurance companies. Thorough documentation
                  and coding help expedite claim processing and reimbursement.
                </li>
                <li>
                  <span className="font-semibold">Denial Management:</span> In
                  the event of claim denials, we analyze the reasons and take
                  corrective actions for resubmission. Our proactive approach
                  maximizes the chances of successful claim processing.
                </li>
                <li>
                  <span className="font-semibold">Payment Posting:</span> We
                  accurately post payments and reconcile them with expected
                  amounts. This meticulous process ensures proper financial
                  tracking and prevents revenue leakage.
                </li>
                <li>
                  <span className="font-semibold">Patient Invoicing:</span>{" "}
                  Patients receive transparent and detailed invoices that
                  explain services rendered, amounts billed, and insurance
                  adjustments. Clear communication fosters trust and timely
                  payments.
                </li>
                <li>
                  <span className="font-semibold">
                    Reporting and Analytics:
                  </span>{" "}
                  Through insightful reports, we provide a comprehensive view of
                  your practice&apos;s financial performance. These reports
                  highlight key metrics, trends, and areas for improvement.
                </li>
              </ol>
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
