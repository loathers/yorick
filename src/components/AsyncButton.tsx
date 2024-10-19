import { LinkProps } from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { RefreshContext } from "tome-kolmafia-client";

import HeaderButton from "./HeaderButton";

export interface AsyncButtonProps extends Omit<LinkProps, "href" | "onClick"> {
  href?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<void>;
}

const AsyncButton: React.FC<AsyncButtonProps> = ({
  href,
  onClick,
  children,
  ...props
}) => {
  const { triggerHardRefresh } = useContext(RefreshContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsLoading(true);
      await (onClick
        ? onClick(event)
        : href && fetch(href).then((response) => response.text()));
      setIsLoading(false);
      triggerHardRefresh();
    },
    [href, onClick, triggerHardRefresh],
  );

  return (
    <>
      <HeaderButton
        href={href}
        onClick={handleClick}
        loading={isLoading}
        {...props}
      >
        {children}
      </HeaderButton>
    </>
  );
};

export default AsyncButton;
