import React, { useCallback } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Td,
  Tr,
} from "@chakra-ui/react";
import {
  isBooleanProperty,
  isNumericProperty,
  isNumericOrStringProperty,
  KnownProperty,
} from "../api/propertyTyping";
import { useGetProperty } from "../hooks/useCall";

type ValidityType =
  | "string"
  | "number"
  | "boolean"
  | "string | number"
  | "quest";

function validityType(property: KnownProperty): ValidityType {
  if (isNumericProperty(property)) {
    return "number";
  } else if (isBooleanProperty(property)) {
    return "boolean";
  } else if (isNumericOrStringProperty(property)) {
    return "string | number";
  } else if (property.startsWith("quest")) {
    return "quest";
  } else {
    return "string";
  }
}

function validValue(type: ValidityType, value: string) {
  switch (type) {
    case "string":
      return true;
    case "number":
      return !!value.match(/^\d+$/);
    case "boolean":
      return !!value.match(/^(true|false)$/);
    case "string | number":
      return true;
    case "quest":
      return !!value.match(/^(unstarted|started|finished|step\d+)$/);
  }
}

interface Props {
  property: KnownProperty;
}

const PropertyRow: React.FC<Props> = ({ property }) => {
  const current = useGetProperty(property);

  const [value, setValue] = React.useState(
    localStorage.getItem(property) ?? ""
  );

  const handleChangeProperty = useCallback(
    (event) => {
      const value = event.target.value;
      setValue(value);
      if (value === "") {
        localStorage.removeItem(property);
      } else if (validValue(validityType(property), value)) {
        localStorage.setItem(property, value);
      }
    },
    [property]
  );

  const handleBlur = useCallback(() => {
    // @ts-ignore
    const chatpane: Window = window.parent.frames.chatpane;
    chatpane.postMessage("refresh");
  }, []);

  const validity = validityType(property);
  const valid = value !== "" && validValue(validity, value);

  return (
    <Tr>
      <Td>
        <Text textAlign="right" my="auto">
          {property}
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
        <Text my="auto">Valid: {validity}</Text>
      </Td>
      <Td>
        <Text my="auto">Current: [{current}]</Text>
      </Td>
    </Tr>
  );
};

export default PropertyRow;
