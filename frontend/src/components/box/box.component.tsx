import { twMerge } from "tailwind-merge";

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export const Box = ({
  children,
  className,
  title,
  ...otherProps
}: BoxProps) => {
  return (
    <section
      className={twMerge(
        "bg-white rounded border-2 shadow w-full h-fit",
        className
      )}
      {...otherProps}
    >
      {title && (
        <div className="w-full pt-5 px-5">
          <h2 className="text-xl mb-1 font-semibold">{title}</h2>
          <hr className="w-full border mb-3"></hr>
        </div>
      )}
      {children}
    </section>
  );
};
