"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-medium">Algo salió mal!</h2>
      <Button asChild>
        <Link href="/">Volver</Link>
      </Button>
    </div>
  );
};

export default Error;
