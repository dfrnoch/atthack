import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import { useEffect, useState } from "react";
import CategoryItem from "./category";
import Popup from "./Popup";
import { useDisclosure } from "@mantine/hooks";
import {Modal, PasswordInput, Popover, Progress, Title} from "@mantine/core";
import { Leaderboard } from "~/components/Leaderboard";
import LecturePoint from "./lecture/LecturePoint";

const HomePage = () => {
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState(0);

  const [opened, { open, close }] = useDisclosure(false);

  const [popupData, setPopupData] = useState({ cat: 0, pos: 0 });

  const { error, data } = api.home.loadData.useQuery();

  const categoryInfo = api.home.categoryInfo.useMutation();

  useEffect(() => {
    categoryInfo.mutateAsync(activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="grid grid-cols-8 gap-8 h-screen m-5">
        <div className="flex flex-col gap-4 col-span-2 overflow-y-scroll no-scrollbar">
          {data?.categories.map((category, index) => (
            <CategoryItem
              description={category.description}
              id={category.id}
              image={category.image}
              name={category.name}
              onClick={() => {
                setActiveCategory(category.id);
              }}
            />
          ))}
        </div>

        <div className="col-span-4 justify-end ">
          <Title className="text-2xl">Kategorie {categoryInfo.data?.category?.name}</Title>
          <div className="text-xl line-clamp-3">{categoryInfo.data?.category?.description}</div>

          {categoryInfo.data?.category?.id == 2 ?
              <PasswordCrack/> : categoryInfo.data?.category?.exercises.map((exercise) => (
            <LecturePoint
              id={exercise.id}
              completed={
                categoryInfo.data.completedExercises?.completedExercises.map((e) => e.id).includes(exercise.id) || false
              }
              name="Emaily a zprávy 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies,"
              onClick={() => {
                setPopupData({ cat: activeCategory, pos: exercise.categoryPosition });
                open();
              }}
            />
          ))}
        </div>
        <div className="col-span-2">
          <Leaderboard />
        </div>
      </div>
      <Modal size={"xl"} opened={opened} onClose={close} centered>
        <Popup cat={popupData.cat} pos={popupData.pos} />
      </Modal>
    </div>
  );
};

export default HomePage;

function PasswordRequirement({meets, label}: { meets: boolean; label: string }) {
  return (
      <h2
          color={meets ? 'teal' : 'red'}
          className={"mt-7"}
      >{label}</h2>
  );
}

const requirements = [
  {re: /[0-9]/, label: 'Includes number'},
  {re: /[a-z]/, label: 'Includes lowercase letter'},
  {re: /[A-Z]/, label: 'Includes uppercase letter'},
  {re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol'},
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function PasswordCrack() {
  const [value, setValue] = useState('');
  const [checks, setChecks] = useState<JSX.Element[]>([]);
  const [color, setColor] = useState<'teal' | 'red' | 'yellow'>('red');

    useEffect(() => {
    const newChecks: JSX.Element[] = [];
    requirements.forEach((requirement) => {
        const meets = requirement.re.test(value);
      console.log(meets, requirement.label);
      if (!meets) newChecks.push(<PasswordRequirement meets={meets} label={requirement.label}/>);
    });
    if(newChecks.length == 0) newChecks.push(<PasswordRequirement meets={true} label={"Perfect"}/> );
    setChecks(newChecks);
    }, [value]);

  const strength = getStrength(value);

  const handleChange = (val: string) => {
    setValue(val);
    const strength = getStrength(val);
    setColor(strength < 70 ? 'red' : strength < 90 ? 'yellow' : 'teal')
  }
  return (
      <div className={"mx-auto w-[340px] items-center my-5"}>
        <Popover position="bottom" width="target" transitionProps={{transition: 'pop'}}>
          <Popover.Target>
            <div
            >
              <PasswordInput
                  withAsterisk
                  label="Your password"
                  placeholder="Your password"
                  value={value}
                  onChange={(event) => handleChange(event.target.value)}
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Progress color={color as any} value={strength} size={5} mb="xs"/>
            <PasswordRequirement meets={value.length > 5}/>
            {checks}
          </Popover.Dropdown>
        </Popover>
      </div>
  );
}