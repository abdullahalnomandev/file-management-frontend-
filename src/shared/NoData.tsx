import Image from "next/image";
import React from "react";

export default function NoData() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="lg:h-[600px]">
        <Image
          src={"/assets/images/others/no-data.png"}
          height={900}
          width={1200}
          alt="no data"
          className="h-fit w-fit lg:h-full lg:w-full"
          draggable={false}
        />
      </div>
    </div>
  );
}
