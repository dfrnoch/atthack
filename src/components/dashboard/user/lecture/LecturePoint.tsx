// LecturePoint
import { Card, CheckIcon, Text } from "@mantine/core";
import React from "react";
import { FaMailchimp } from "react-icons/fa";
import { theme } from "tailwind.config.cjs";

type LecturePointProps = {
  id: string;
  completed: boolean;
  name: string;
  description?: string;
  onClick?: () => void;
};

const LecturePoint: React.FC<LecturePointProps> = ({ id, completed, onClick, name, description }) => {
  return (
    <Card
      key={id}
      shadow="md"
      radius="md"
      padding="xl"
      onClick={onClick}
      mt={20}
      className={`hover:shadow-lg transition-shadow ease-in-out duration-200${
        completed ? " bg-green-100" : " cursor-pointer"
      }`}
    >
      {completed && (
        <Text color="lime" size="sm" className="flex flex-row gap-2 items-center">
          <CheckIcon width={15} height={15} />
          Splněno
        </Text>
      )}
      <Text fz="lg" fw={500}>
        {name}
      </Text>
      <Text fz="sm" c="dimmed" className="line-clamp-2">
        {description}
      </Text>
    </Card>
  );
};

export default LecturePoint;
