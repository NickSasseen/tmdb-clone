import { ReactNode } from "react";

const DetailSection = ({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="divider divider-start divider-error">
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default DetailSection;