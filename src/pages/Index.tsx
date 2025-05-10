
import { useState } from "react";
import TextEditor from "@/components/TextEditor";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <TextEditor />
      </main>
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
