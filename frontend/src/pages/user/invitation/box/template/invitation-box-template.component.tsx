import { Button, ButtonProps } from "src/components";
import { ButtonColor } from "src/enums";
import { twMerge } from "tailwind-merge";

export interface InvitationTemplateProps {
  title: string;
  billName: string;
  sideText: string;
  button: ButtonProps;
}

export interface InvitationBoxProps {
  billName: string;
  onClick: () => void;
}

export const InvitationBoxTemplate = ({
  title,
  billName,
  sideText,
  button,
}: InvitationTemplateProps) => {
  return (
    <div className="flex flex-col items-center gap-3 pb-5">
      <div className="lg:text-xl text-lg text-center">{title}</div>
      <div className="lg:text-3xl text-2xl w-11/12 line-clamp-3 text-center font-medium">
        {billName}
      </div>
      <div className="lg:text-xl text-lg text-center">{sideText}</div>
      <Button
        color={ButtonColor.GREEN}
        {...button}
        className={twMerge("w-48", button.className)}
      />
    </div>
  );
};
