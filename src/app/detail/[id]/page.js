"use client";

import { useParams } from "next/navigation";
export default function Detail() {
  const params = useParams();
  console.log("this param", params);
  return <div>hello</div>;
}
