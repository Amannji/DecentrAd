"use client";
import CreateAdSpace from "./components/CreateAdSpace";
import CreatePublisherContract from "./components/CreatePublisherContract";
import { useState } from "react";
export default function Page() {
  const [isStep2, setIsStep2] = useState(false);
  return (
    <>
      {isStep2 ? (
        <CreateAdSpace />
      ) : (
        <CreatePublisherContract setIsStep2={setIsStep2} />
      )}
    </>
  );
}
