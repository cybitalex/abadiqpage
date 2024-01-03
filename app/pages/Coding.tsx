import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Link from "next/link";

export default function Coding() {
  const [text] = useTypewriter({
    words: ["Coding"],
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
            <h2 className="text-3xl font-semibold text-purple-600 mb-4">
              Our Medical Coding Process
            </h2>
            <br />
            <div className="text-left text-gray-500 animate-fade-in">
              <ol className="list-decimal pl-6 space-y-4">
                <li className="mb-4">
                  <span className="font-semibold">Medical Coding:</span> Medical
                  coding is a critical process that involves translating complex
                  medical procedures, diagnoses, and services into standardized
                  codes. These codes serve as a universal language that helps
                  healthcare providers, insurance companies, and regulatory
                  agencies understand and process medical information
                  consistently and accurately.
                </li>
                <li className="mb-4">
                  <span className="font-semibold">
                    Certified Medical Coders:
                  </span>{" "}
                  At Abad IQ, our certified medical coders are highly trained
                  professionals with a deep understanding of medical
                  terminology, anatomy, and healthcare procedures. They
                  meticulously review patient medical records, extracting
                  pertinent information and assigning the appropriate
                  alphanumeric codes to each service provided. These codes are
                  essential for documentation, billing, and reimbursement
                  purposes.
                </li>
                <li className="mb-4">
                  <span className="font-semibold">
                    Standardized Coding Systems:
                  </span>{" "}
                  Medical coding relies on established code sets such as the
                  Current Procedural Terminology (CPT) code set, which defines
                  medical procedures and services performed by healthcare
                  providers. The International Classification of Diseases (ICD)
                  codes capture diagnoses and health conditions. Additionally,
                  the Healthcare Common Procedure Coding System (HCPCS) covers
                  supplies, equipment, and other services not included in CPT.
                </li>
                <li className="mb-4">
                  <span className="font-semibold">
                    Accuracy and Compliance:
                  </span>{" "}
                  Each code reflects specific details about the medical service,
                  including its nature, complexity, and any associated
                  conditions. Accurate coding ensures that medical services are
                  appropriately documented and billed, facilitating transparent
                  communication between healthcare providers and insurance
                  companies. It also aids in preventing fraud, maintaining
                  compliance with regulations, and promoting consistent data
                  analysis.
                </li>
                <li>
                  <span className="font-semibold">
                    Impact on Reimbursement:
                  </span>{" "}
                  In the medical billing process, precise coding is crucial for
                  proper reimbursement. The coded information is included in
                  insurance claims submitted to payers. Our team&apos;s
                  commitment to accuracy and compliance guarantees that each
                  code accurately represents the medical service provided,
                  contributing to a seamless billing process and optimal
                  financial outcomes for both patients and healthcare
                  organizations.
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
