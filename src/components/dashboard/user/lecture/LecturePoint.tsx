// LecturePoint
import { Card, Text } from "@mantine/core";
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
    <Card shadow="md" radius="md" padding="xl" onClick={onClick} mt={20} className="hover:shadow-lg transition-shadow ease-in-out duration-200" >
      <Text fz="lg" fw={500} mt="md">
        {name}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm" className="line-clamp-2">
        {description}
      </Text>
    </Card>
  );
};

export default LecturePoint;
