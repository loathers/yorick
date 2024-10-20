import { EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const PrefsButton: React.FC = () => {
  return (
    <IconButton
      onClick={() => {
        const mainpane = window.parent.parent.frames.mainpane;
        if (mainpane) {
          mainpane.location.href = "http://localhost:3000/yorick/prefs";
        }
      }}
      icon={<EditIcon />}
      aria-label="Open Overrides"
      size="xs"
      fontSize="15px"
      variant="outline"
      backgroundColor="white"
    >
      overrides
    </IconButton>
  );
};

export default PrefsButton;
