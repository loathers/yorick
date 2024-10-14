import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import {
  CloseButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";

interface ValidatedInputProps extends InputProps {
  valid: boolean;
  setValue?: (value: string) => void;
}

const ValidatedInput = ({
  valid,
  value,
  setValue,
  ...props
}: ValidatedInputProps) => {
  const nonEmpty = !!(value && value !== "");
  const iconProps = props.size === "sm" ? { w: 8, h: 8 } : {};
  return (
    <Stack direction="row" alignItems="center">
      <InputGroup>
        <Input
          value={value}
          isInvalid={!valid && nonEmpty}
          borderColor={valid && nonEmpty ? "green.500" : undefined}
          focusBorderColor={
            valid && nonEmpty
              ? "green.500"
              : !valid && nonEmpty
                ? "red.500"
                : undefined
          }
          _hover={
            valid && nonEmpty
              ? { borderColor: "green.600" }
              : !valid && nonEmpty
                ? { borderColor: "red.600" }
                : undefined
          }
          {...props}
        />
        {valid && nonEmpty && (
          <InputRightElement pointerEvents="none" {...iconProps}>
            <CheckIcon color="green.500" />
          </InputRightElement>
        )}
        {!valid && nonEmpty && (
          <InputRightElement pointerEvents="none" {...iconProps}>
            <WarningIcon color="red.500" />
          </InputRightElement>
        )}
      </InputGroup>
      {setValue && <CloseButton onClick={() => setValue("")} />}
    </Stack>
  );
};

export default ValidatedInput;
