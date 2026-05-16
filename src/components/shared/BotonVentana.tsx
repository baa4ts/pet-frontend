// BotonVentana.tsx
import { memo } from "react";

import { Eye } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

type Props = {
  url: string;
  width?: number;
  height?: number;
};

const BotonVentana = memo(({ url, width = 380, height = 480 }: Props) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={() =>
        window.open(url, "_blank", `width=${width},height=${height},left=200,top=100`)
      }
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
});

export default BotonVentana;
