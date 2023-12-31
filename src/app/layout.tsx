import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@app/components/header";
import Footer from "@app/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Scissor",
	description: "Your Ultimate URL Shortening Solution",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/png" sizes="16x16" href="/scissor.png" />
			</head>
			<body className={inter.className}>
				<main className={inter.className}>
					<Header />
					{children}
					<Footer />
				</main>
			</body>
		</html>
	);
}
