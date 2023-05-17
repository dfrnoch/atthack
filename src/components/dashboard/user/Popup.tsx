import dynamic from "next/dynamic";

const exerciseList = [
  [
    dynamic(() => import("~/components/categories/email-security/1")),
  ],
];

export default function Popup({ cat, pos }: { cat: number; pos: number }) {
  // @ts-ignore
  const Component = exerciseList[cat - 1][pos - 1];

  return <>{Component && <Component />}</>;
}
