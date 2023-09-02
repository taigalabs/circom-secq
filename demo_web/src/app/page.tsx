"use client";

import React from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  React.useEffect(() => {
    async function fn() {
      const res = await fetch("/api");
      const a = await res.json();

      console.log(22, a);
    }

    fn().then();
  }, []);
  return <div>power</div>;
}
