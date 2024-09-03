import { Box, Image, ImageProps } from "@chakra-ui/react";

interface Props extends ImageProps {
  imageUrl?: string;
  imageAlt?: string;
}

const TileImage: React.FC<Props> = ({
  imageUrl,
  imageAlt,
  boxSize,
  ...props
}) =>
  imageUrl ? (
    <Image
      src={imageUrl}
      alt={imageAlt}
      fit="contain"
      boxSize={boxSize}
      {...props}
    />
  ) : (
    <Box w={boxSize} />
  );

export default TileImage;
