import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import { useEffect, useState } from "react";
import CategoryItem, { Category } from "./category";

const categories: Category[] = [
  {
    title: "Všechny",
    description: "Všechny kategorie",
    image:
      "https://images.unsplash.com/photo-1621574539437-4b7b0b0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0ZWdvcnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    status: "COMPLETED",
  },
  {
    title: "Všechny",
    description: "Všechny kategorie",
    image:
      "https://images.unsplash.com/photo-1621574539437-4b7b0b0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0ZWdvcnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    status: "IN_PROGRESS",
  },
];

const HomePage = () => {
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState(0);

  // const { error, data } = api.home.loadData.useQuery();

  // const categoryInfo = api.home.categoryInfo.useMutation();

  // useEffect(() => {
  //   categoryInfo.mutateAsync(activeCategory);

  // }, [activeCategory]);

  return (
    <div>
      <div className="grid grid-cols-8 gap-4 h-screen">
        <div className="flex flex-col gap-4 col-span-2">
          {categories.map((category, index) => (
            <CategoryItem
              description={category.description}
              image={category.image}
              title={category.title}
              status={category.status}
            />
          ))}
        </div>

        <div className="col-span-4 bg-green-200">Column 2</div>
        <div className="col-span-2 bg-blue-200">Column 3</div>
      </div>
    </div>
  );
};

export default HomePage;
