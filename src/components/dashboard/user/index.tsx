import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import { useEffect, useMemo, useState } from "react";
import CategoryItem from "./category";
import Popup from "./Popup";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Title } from "@mantine/core";
import { Leaderboard } from "~/components/Leaderboard";
import LecturePoint from "./lecture/LecturePoint";
import { notifications } from "@mantine/notifications";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const [opened, { open, close }] = useDisclosure(false);

  const [popupData, setPopupData] = useState({ cat: 0, pos: 0 });

  const { error, data } = api.home.loadData.useQuery();

  const categoryInfo = api.home.categoryInfo.useMutation();

  useEffect(() => {
    categoryInfo.mutateAsync(activeCategory);
  }, [activeCategory]);

  const completedExercises = useMemo(() => {
    return categoryInfo.data?.completedExercises?.completedExercises.map((e) => e.id);
  }, [categoryInfo.data?.completedExercises?.completedExercises]);

  //get the position of the last completed exercise
  const lastCompletedExercise = useMemo(() => {
    if (completedExercises) {
      return completedExercises.length;
    } else {
      return 0;
    }
  }, [completedExercises]);

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

          {categoryInfo.data?.category?.exercises.map((exercise) => (
            <LecturePoint
              id={exercise.id}
              completed={
                categoryInfo.data.completedExercises?.completedExercises.map((e) => e.id).includes(exercise.id) || false
              }
              name="Emaily a zprávy 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies,"
              onClick={() => {
                //check if the exercise is not completed
                if (exercise.categoryPosition === lastCompletedExercise + 1) {
                  setPopupData({ cat: activeCategory, pos: exercise.categoryPosition });
                  open();
                } else {
                  notifications.show({
                    title: "Nelze otevřít",
                    message: "Nejprve musíte dokončit předchozí cvičení",
                    color: "red",
                  });
                }
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
