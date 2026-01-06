import { Metadata } from "next";
import HomeComponnet from "@/components/home";

export const metadata: Metadata = {
  title:
    "Software Engineer & DRL Researcher | Accademic Profile - As Md Habibullah",
  description:
    "Software Engineer and PhD researcher specializing in Deep Reinforcement Learning, financial systems, and production SaaS engineering.",
};

export default function Home() {
  return <HomeComponnet />;
}
