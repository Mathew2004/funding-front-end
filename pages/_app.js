import "@/styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
