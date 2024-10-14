import {
  Input,
  InputProps,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { ChangeEvent, forwardRef, useCallback, useState } from "react";

function mod(n: number, k: number): number {
  const naive = n % k;
  return naive < 0 ? naive + k : naive;
}

function getMatchingValues(
  value: string,
  allValues: string[],
  maxOptions: number,
) {
  const valueLower = value.toLowerCase();
  return value.length >= 3
    ? allValues
        .filter((name) => name.toLowerCase().includes(valueLower))
        .slice(0, maxOptions)
    : [];
}

export interface AutocompleteInputProps
  extends Omit<InputProps, "value" | "onSubmit"> {
  value: string;
  maxOptions: number;
  allValues: string[];
  hide: boolean;
  onSubmit: (current: string | null) => void;
}

const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  (
    { value, maxOptions, allValues, hide, onChange, onSubmit, ...props },
    ref,
  ) => {
    const [autoIndex, setAutoIndex] = useState<number | null>(null);

    const matchingValues = getMatchingValues(value, allValues, maxOptions);

    const handleAutocompleteKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (
          event.key === "ArrowUp" ||
          event.key === "ArrowDown" ||
          event.key === "Tab"
        ) {
          event.preventDefault();
          event.stopPropagation();
          const increment = event.key === "ArrowDown" ? 1 : -1;
          setAutoIndex((index) => {
            if (index === null) {
              return increment === 1 ? 0 : -1;
            } else {
              return index + increment;
            }
          });
        } else if (event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();
          onSubmit(event.currentTarget.getAttribute("data-current"));
        } else if (event.key === "Escape") {
          event.currentTarget.blur();
        }
      },
      [onSubmit],
    );

    const handleAutocompleteClick = useCallback(
      (event: React.MouseEvent<HTMLLIElement>) => {
        onSubmit(event.currentTarget.getAttribute("data-current"));
      },
      [onSubmit],
    );

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);

        const newValue = event.currentTarget.value;
        if (
          newValue &&
          getMatchingValues(newValue, allValues, maxOptions).length === 1
        ) {
          setAutoIndex(0);
        } else {
          setAutoIndex(null);
        }
      },
      [allValues, maxOptions, onChange],
    );

    return (
      <Popover
        isOpen={!hide && value.length >= 3 && matchingValues.length > 0}
        autoFocus={false}
        placement="top"
      >
        <PopoverTrigger>
          <Input
            size="xs"
            value={value}
            onChange={handleChange}
            onKeyDown={handleAutocompleteKeyDown}
            data-current={
              autoIndex === null
                ? undefined
                : matchingValues[mod(autoIndex, matchingValues.length)]
            }
            ref={ref}
            {...props}
          ></Input>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <List listStyleType="none">
              {matchingValues.map((name, index) => {
                const highlight =
                  autoIndex !== null &&
                  mod(autoIndex, matchingValues.length) === index;
                return (
                  <ListItem
                    key={name}
                    data-current={name}
                    cursor="pointer"
                    onMouseEnter={() => setAutoIndex(index)}
                    onClick={handleAutocompleteClick}
                    background={highlight ? "Highlight" : undefined}
                  >
                    {name}
                  </ListItem>
                );
              })}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  },
);

export default AutocompleteInput;
