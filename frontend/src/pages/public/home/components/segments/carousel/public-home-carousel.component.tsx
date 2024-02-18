import { Carousel } from "src/components/carousel/carousel.component";
import sliderFamily from "src/assets/slider-family.jpg";
import sliderFriends from "src/assets/slider-friends.jpg";
import sliderTeam from "src/assets/slider-team.jpg";
import { useNavigate } from "react-router-dom";
export const PublicHomeCarousel = () => {
  const navigate = useNavigate();

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  return (
    <Carousel
      layersData={[
        {
          title: "FOR FRIENDS",
          backgroundURL: sliderFriends,
          onButtonClick: navigateToLoginPage,
        },
        {
          title: "FOR FAMILY",
          backgroundURL: sliderFamily,
          onButtonClick: navigateToLoginPage,
        },
        {
          title: "FOR TEAMS",
          backgroundURL: sliderTeam,
          onButtonClick: navigateToLoginPage,
        },
      ]}
    />
  );
};
