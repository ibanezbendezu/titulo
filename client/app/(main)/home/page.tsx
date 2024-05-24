"use client";

import { Heroes } from "../_components/heroes";
import { SearchCommand } from "../../../components/ui/search-command";
import { withAuth } from "@/components/auth";
import { Button } from "@/components/ui/button";
//import { api } from "@/convex/_generated/api";
//import { useMutation } from "convex/react";
import { PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import { NextResponse } from "next/server";
import dynamic from "next/dynamic";

const Home = () => {
  const router = useRouter();

  const user = useUser();

  //const create = useMutation(api.documents.create);

    /*
  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new not.",
    });
  };*/

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">
        Bienvenido firstName
      </h2>

      <SearchCommand />

      {/* <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Crea una comparación
      </Button> */}

      <Heroes />
      
    </div>
  );
};

export default Home;
