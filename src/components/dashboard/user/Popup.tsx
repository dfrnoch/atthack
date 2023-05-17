import dynamic from "next/dynamic";

const exerciseList = [
  [
    dynamic(() => import("~/components/categories/email/1")),
    dynamic(() => import("~/components/categories/email/2")),
    dynamic(() => import("~/components/categories/email/3")),
    dynamic(() => import("~/components/categories/email/4")),
  ],
];

export default function Popup({ cat, pos }: { cat: number; pos: number }) {
  // @ts-ignore
  const Component = exerciseList[cat - 1][pos - 1];

  return <>{Component && <Component />}</>;
}
