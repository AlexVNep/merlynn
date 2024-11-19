import Image from "next/image";

export default function MerlynnLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <Image
        // className="h-12 w-12"
        src="/MerlynnLogo.png"
        width={500}
        height={500}
        alt="Merlynn logo"
      />
    </div>
  );
}
