import { Plus_Jakarta_Sans } from "next/font/google";
import InputText from "./_components/InputText";
import { useRef } from "react";
import SignInForm from "./_components/Signin";

const geistMono = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function Home() {
 
  return (
    <SignInForm/>
  );
}
