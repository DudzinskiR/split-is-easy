import { ReactNode } from "react";
import { FaMoneyBillWave, FaPlus, FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import customPaymentVideo from "src/assets/videos/custom-payment-video.mp4";
import newPaymentMobile2 from "src/assets/videos/new-payment-video.mp4";
import settleVideo from "src/assets/videos/settle-video.mp4";
import virtualUserVideo from "src/assets/videos/virtual-user-video.mp4";

type VideoData = {
  src: string;
  title: string;
  description: string;
  color: string;
  icon: ReactNode;
};

export const videosData: VideoData[] = [
  {
    src: newPaymentMobile2,
    title: "New payment",
    description:
      "It only takes a moment, and you can easily add a new payment to your bill",
    color: "#1362b3",
    icon: <FaPlus />,
  },
  {
    src: settleVideo,
    title: "Settle",
    description:
      "Just 2 clicks are enough to add a settlement with another user",
    color: "#b42b64",
    icon: <FaMoneyBillWave />,
  },
  {
    src: customPaymentVideo,
    title: "Custom payment",
    description:
      "Is your payment non-standard? Should someone pay more than others? No problem at all!",
    color: "#ed7847",
    icon: <IoSettingsOutline />,
  },
  {
    src: virtualUserVideo,
    title: "Virtual user",
    description:
      "One of your friends can't join the bill right now? Don't worry, we have a solution. Add a virtual user. Once your friend joins the bill, you can merge the virtual user's payments with your friend's.",
    color: "#00ac2b",
    icon: <FaUser />,
  },
];
