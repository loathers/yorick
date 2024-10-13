import { Heading, Image } from "@chakra-ui/react";

const BrandHeading: React.FC = () => (
  <Heading as="h1" size="xl" textAlign="center">
    Y
    <Image
      src="Skull192.png"
      alt="O"
      display="inline"
      h="2rem"
      mb="-4px"
      ml="-5px"
      mr="-2px"
      // FIXME: make logo itself transparent.
      mixBlendMode="multiply"
    />
    RICK
  </Heading>
);

export default BrandHeading;
