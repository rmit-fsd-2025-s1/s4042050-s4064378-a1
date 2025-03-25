import { SubmitButtonWrapper } from "./elements";

export const SubmitButton = ({
  children,
  type,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <SubmitButtonWrapper type="submit" {...props}>
      {children}
    </SubmitButtonWrapper>
  );
};
