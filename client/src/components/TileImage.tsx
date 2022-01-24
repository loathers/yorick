import { Box, Image, ImageProps } from "@chakra-ui/react";

interface Props extends ImageProps {
  imageUrl?: string;
  imageAlt?: string;
}

const TileImage: React.FC<Props> = ({ imageUrl, imageAlt, ...props }) =>
  imageUrl ? (
    <Image
      src={imageUrl}
      alt={imageAlt}
      boxSize="30px"
      fit="contain"
      {...props}
    />
  ) : (
    <Box w="30px" />
  );

export default TileImage;
