import { ButtonProps, forwardRef, Tooltip } from "@chakra-ui/react";
import { useCallback, useContext, useMemo, useState } from "react";
import { RefreshContext, remoteCliExecute } from "tome-kolmafia";

import HeaderButton from "./HeaderButton";

export interface AsyncButtonProps extends ButtonProps {
  href?: string;
  command?: string;
}

const AsyncButton: React.FC<AsyncButtonProps> = forwardRef(
  ({ href, command, onClick, children, ...props }, ref) => {
    const { triggerHardRefresh } = useContext(RefreshContext);
    const [isLoading, setIsLoading] = useState(false);

    const onClickWithCommand = useMemo(
      () =>
        command && !onClick
          ? async () => {
              await remoteCliExecute(command);
            }
          : onClick,
      [command, onClick],
    );

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        await (onClickWithCommand
          ? onClickWithCommand(event)
          : href && fetch(href).then((response) => response.text()));
        setIsLoading(false);
        triggerHardRefresh();
      },
      [href, onClickWithCommand, triggerHardRefresh],
    );

    return (
      <HeaderButton
        isLoading={isLoading}
        href={href}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {command ? (
          <Tooltip label={command} fontSize="xs">
            {children}
          </Tooltip>
        ) : (
          children
        )}
      </HeaderButton>
    );
  },
);

export default AsyncButton;
