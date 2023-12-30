"use client";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import MainPage from "../../components/Splashpage";

export default function Billing() {
  const [text] = useTypewriter({
    words: ["Billing"],
    typeSpeed: 120,
    loop: 1,
    deleteSpeed: 80,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-12 lg:p-24">
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
              Our Billing Process
            </h2>
            <br />
            <div className="text-left text-gray-500 animate-fade-in">
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <p>
                    <strong>
                      Patient Registration and Insurance Verification:
                    </strong>{" "}
                    We begin by gathering accurate patient information and
                    verifying insurance coverage. This step lays the foundation
                    for a seamless billing process.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Medical Coding:</strong> Our certified coders
                    meticulously translate medical procedures and diagnoses into
                    appropriate codes, ensuring alignment with industry
                    standards. This step is pivotal for proper reimbursement.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Claim Generation:</strong> Using advanced billing
                    software, we generate comprehensive claims that include all
                    relevant codes, patient information, and procedure details.
                    Our attention to detail minimizes the risk of claim denials.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Claims Submission:</strong> We submit claims
                    electronically to insurance companies, expediting the
                    processing time. Our familiarity with various insurance
                    portals ensures a smooth submission process.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Denial Prevention and Management:</strong> Our
                    proactive approach includes conducting thorough reviews of
                    claims before submission to identify potential issues. If a
                    claim is denied, we promptly analyze the reason and take
                    corrective measures for resubmission.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Payment Posting and Reconciliation:</strong> As
                    payments are received, we accurately post them to individual
                    patient accounts. Our reconciliation process ensures that
                    payments match the expected amounts.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Patient Invoicing and Statements:</strong> Patients
                    receive clear and detailed invoices that explain the
                    services rendered, the amounts billed, and any applicable
                    insurance adjustments. We also manage patient statements and
                    inquiries.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Reporting and Analytics:</strong> Through insightful
                    reports, you gain a comprehensive view of your
                    practice&apos;s financial performance. These reports
                    highlight key metrics, trends, and areas for improvement.
                  </p>
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
