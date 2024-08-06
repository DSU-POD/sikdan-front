import FoodSearchComponent from "@/components/food-search-component";

export default function Foodsearch({ name }) {
  return (
    <>
      <FoodSearchComponent name={name} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
};
