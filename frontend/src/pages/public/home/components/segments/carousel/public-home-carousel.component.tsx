import { Carousel } from "src/components/carousel/carousel.component";
import sliderFamily from "src/assets/slider-family.jpg";
import sliderFriends from "src/assets/slider-friends.jpg";
import sliderTeam from "src/assets/slider-team.jpg";
export const PublicHomeCarousel = () => {
  return (
    <Carousel
      layersData={[
        { title: "FOR FRIENDS", backgroundURL: sliderFriends },
        { title: "FOR FAMILY", backgroundURL: sliderFamily },
        { title: "FOR TEAMS", backgroundURL: sliderTeam },
      ]}
    />
  );
};
