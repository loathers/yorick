import { CheckIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback } from "react";
import React from "react";

import { Override, validityType, validValue } from "./valid";

// override can be the name of a location, in which case it's turnsSpent there.
interface OverrideRowProps {
  override: Override;
  current: string;
}

const OverrideRow: React.FC<OverrideRowProps> = ({ override, current }) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(override) ?? ""
  );

  const handleChangeProperty = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValue(value);
      if (value === "") {
        localStorage.removeItem(override);
      } else if (validValue(validityType(override), value)) {
        localStorage.setItem(override, value);
      }
    },
    [override]
  );

  const handleBlur = useCallback(() => {
    // @ts-ignore
    const chatpane: Window = window.parent.frames.chatpane;
    chatpane.postMessage("refresh");
  }, []);

  const validity = validityType(override);
  const valid = value !== "" && validValue(validity, value);

  return (
    <Tr>
      <Td>
        <Text textAlign="right" my="auto">
          {override}
        </Text>
      </Td>
      <Td>
        <InputGroup>
          <Input
            value={value}
            onChange={handleChangeProperty}
            onBlur={handleBlur}
            isInvalid={!valid && value !== ""}
            borderColor={valid ? "green.500" : undefined}
            focusBorderColor={valid ? "green.500" : undefined}
            _hover={valid ? { borderColor: "green.600" } : undefined}
            size="sm"
            minW="6rem"
            placeholder={current}
          />
          {valid && (
            <InputRightElement
              pointerEvents="none"
              w={8}
              h={8}
              children={<CheckIcon color="green.500" />}
            />
          )}
        </InputGroup>
      </Td>
      <Td>
        <Text my="auto">{validity}</Text>
      </Td>
      <Td>
        <Text my="auto">Current: [{current}]</Text>
      </Td>
    </Tr>
  );
};

export default OverrideRow;
