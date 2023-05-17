import EmailExercise1 from "~/components/categories/email-security/1";
import {api} from "~/utils/api";

const exerciseList = [
  [
    ((onCompleted: () => void) => <EmailExercise1 onCompleted={onCompleted}/>)
  ],
];

export default function Popup({ cat, pos, onCompleted }: { cat: number; pos: number, onCompleted?: () => void }) {
  // @ts-ignore
  const Component = exerciseList[cat - 1][pos - 1](onCompleted);

  return <>{Component && Component}</>;
}