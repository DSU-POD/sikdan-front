import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "./member/register/login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Login />;
}

export const getServerSideProps = async () => {
  return {
    props: {
      isBeforeLogin: true,
    },
  };
};
