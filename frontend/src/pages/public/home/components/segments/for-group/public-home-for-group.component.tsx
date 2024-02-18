import promo from "src/assets/promo.png";
const group: { name: string; text: string }[] = [
  {
    name: "Housemates",
    text: "For roommates who want to avoid the hassle of bills and evenly split expenses in their rented space",
  },
  {
    name: "Friend Groups",
    text: "For groups of friends who frequently spend time together, sharing the costs of meals, outings, and other joint activities",
  },
  {
    name: "Couples",
    text: "For couples looking to consolidate their finances and easily track shared expenses without manually managing bills",
  },
  {
    name: "Project Teams",
    text: "For project teams working on collaborative projects, to efficiently manage work-related expenses and projects",
  },
  {
    name: "Shared Student Housing",
    text: "For students sharing housing, looking to efficiently organize shared expenses for their student life",
  },
  {
    name: "Families",
    text: "For families wanting to easily divide expenses for daily needs and recreational outings, without unnecessary complications",
  },
];

export const PublicHomeForGroupSegment = () => {
  return (
    <section className="flex flex-col gap-5">
      <p className="text-2xl mx-5">
        Do you share a living space with friends, a partner, or roommates? Have
        you ever found yourself wasting time reconciling shared expenses or
        keeping track of bills? Our shared expense management app is designed
        just for you! Make the daily organization of finances simpler and more
        enjoyable. Let splitting bills become easier, and life with loved ones
        more hassle-free!
      </p>
      <div className="flex flex-col md:flex-row justify-between mx-5">
        <div className="w-full md:w-1/2">
          <p className="text-3xl mb-5">This app is designed for:</p>
          <ul className="text-lg flex flex-col gap-3 md:mx-8">
            {group.map((item, index) => (
              <li key={index}>
                <span className="font-semibold">{item.name}: </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center mt-5">
          <img src={promo} alt="group" className="" />
        </div>
      </div>
    </section>
  );
};
