import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { ThemeContextProvider } from "../context/ThemeContext";
import ThemeProvider from "../providers/ThemeProvider";
import AuthProvider from "../providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ESThER Doc",
  description: "Centre de documentation de l'Ecole Supérieure de Théologie et d'Etudes Religieuses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
