"use client";

import React from "react";
import Image from "next/image";
import styles from "./page.module.scss";

import { DataJSON } from "./data";

export default function Home() {
  const [data, setData] = React.useState<DataJSON>();
  const [circuit, setCircuit] = React.useState("multiplier2");
  const [prime, setPrime] = React.useState("bls12381");

  React.useEffect(() => {
    async function fn() {
      const res = await fetch("/api");
      const data = await res.json();
      setData(data);
    }

    fn().then();
  }, [setData]);

  const elem = React.useMemo(() => {
    if (data) {
      const { fileContent } = data[circuit];
      const { constraints } = data[circuit].analysis[prime];

      let skipped = false;
      let constraintIdx = 0;
      const elems: React.ReactNode[] = [];

      elems.push(
        <div className={styles.row} key="first">
          <div className={styles.lineNo}></div>
          <div className={styles.line}></div>
          <div className={styles.polyCol}>A</div>
          <div className={styles.polyCol}>B</div>
          <div className={styles.polyCol}>C</div>
        </div>
      );

      fileContent.forEach((line, idx) => {
        let aElem = [],
          bElem = [],
          cElem = [];
        if (
          line.includes("component") ||
          line.includes("<==") ||
          line.includes("===")
        ) {
          if (!line.includes("component main") && !line.includes("//")) {
            // ad hoc
            if (circuit === "multiplier3" && !skipped) {
              skipped = true;
              // return;
            } else {
              // console.log(1, constraints, constraintIdx);
              const row = constraints[constraintIdx];

              if (row) {
                const [a, b, c] = row;
                // console.log("a", a);
                for (const [k, v] of Object.entries(a)) {
                  aElem.push(`${k} * ${v}`);
                }

                // console.log("bbb", b);
                for (const [k, v] of Object.entries(b)) {
                  bElem.push(`${k} * ${v}`);
                }

                // console.log("c", c);

                for (const [k, v] of Object.entries(c)) {
                  cElem.push(`${k} * ${v}`);
                }
                constraintIdx += 1;
              }
            }
          }
        }

        const whitespaceElem = [];
        for (let idx = 0; idx < line.length; idx += 1) {
          if (line[idx] !== " ") {
            break;
          }
          whitespaceElem.push(
            <span key={idx} className={styles.whitespace}></span>
          );
        }

        elems.push(
          <div className={styles.row} key={idx}>
            <div className={styles.lineNo}>{idx}</div>
            <div className={styles.line}>
              {whitespaceElem}
              {line}
            </div>
            <div className={styles.polyCol}>{aElem.join(" + ")}</div>
            <div className={styles.polyCol}>{bElem.join(" + ")}</div>
            <div className={styles.polyCol}>{cElem.join(" + ")}</div>
          </div>
        );
      });

      return elems;
    } else {
      return <div>Loading...</div>;
    }
  }, [data, prime, circuit]);

  return (
    <div className={styles.wrapper}>
      <div>
        <ul>
          <li>
            <button onClick={() => setCircuit("multiplier2")}>
              Multiplier2
            </button>
            <button onClick={() => setCircuit("vitalik")}>Vitalik</button>
            <button onClick={() => setCircuit("multiplier3")}>
              Multiplier3
            </button>
          </li>
        </ul>

        <ul>
          <li>
            <button onClick={() => setPrime("bls12381")}>Bls12-381</button>
            <button onClick={() => setPrime("secq256k1")}>Secq256k1</button>
          </li>
        </ul>
      </div>
      <div>{elem}</div>
    </div>
  );
}
