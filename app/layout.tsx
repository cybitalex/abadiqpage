import "./globals.css";
import { Metadata } from "next"; // Removed "type" keyword

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Abad IQ",
	description: "Professional Medical Billing Services",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
