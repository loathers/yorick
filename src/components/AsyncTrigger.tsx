import React, {
  ForwardedRef,
  forwardRef,
  PropsWithoutRef,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { RefreshContext, remoteCliExecute } from "tome-kolmafia";

type MandatoryProps<ElementType> = {
  ref?: ForwardedRef<ElementType>;
  isLoading: boolean;
  href?: string;
  command?: string;
  onClick?: (event: React.MouseEvent<ElementType>) => void | Promise<void>;
};

type AsyncTriggerProps<
  ElementType extends Element,
  ComponentProps extends MandatoryProps<ElementType>,
> = Omit<ComponentProps, "isLoading" | "ref">;

const AsyncTrigger = <
  ElementType extends Element,
  ComponentProps extends MandatoryProps<ElementType>,
>(
  Component: React.FC<ComponentProps>,
) =>
  forwardRef<ElementType, AsyncTriggerProps<ElementType, ComponentProps>>(
    (
      {
        // @ts-expect-error I give up
        href,
        // @ts-expect-error I give up
        command,
        // @ts-expect-error I give up
        onClick,
        ...props
      }: PropsWithoutRef<AsyncTriggerProps<ElementType, ComponentProps>>,
      ref: ForwardedRef<ElementType>,
    ) => {
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
        async (event: React.MouseEvent<ElementType>) => {
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
        // @ts-expect-error I give up
        <Component
          ref={ref}
          isLoading={isLoading}
          href={href}
          command={command}
          onClick={handleClick}
          {...props}
        />
      ) as ReactNode;
    },
  );

export default AsyncTrigger;
