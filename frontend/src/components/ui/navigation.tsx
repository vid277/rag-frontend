import Image from "next/image";
import aiLogo from "../../app/images/aigt.jpeg";
import { SidebarTrigger } from "./sidebar";

export default function Navigation() {
  return (
    <div className="flex flex-row-reverse justify-between items-center w-full h-20 bg-background border-gray-200 p-6 px-8">
      <div className="flex flex-row items-center justify-center gap-3">
        <span className="text-2xl font-shippori">x</span>
        <Image
          src={aiLogo}
          alt="logo"
          width={50}
          height={50}
          className="rounded-full mx-2"
        />
      </div>
      <SidebarTrigger />
    </div>
  );
}
