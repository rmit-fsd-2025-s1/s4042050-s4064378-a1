import { PrimaryButtonWrapper } from "./elements";

export const PrimaryButton = ({
  children,
  type,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <PrimaryButtonWrapper type="submit" {...props}>
      {children}
    </PrimaryButtonWrapper>
  );
};
