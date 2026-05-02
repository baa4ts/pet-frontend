import { memo } from "react";
import { useNavigate } from "react-router";

import { PlusCircleIcon } from "@phosphor-icons/react";

type Props = {
  url: string;
};

const AgregarAlgo = memo(({ url }: Props) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(url, { replace: true })}
      className="h-12 flex items-center justify-center rounded-md cursor-pointer border-2 border-dashed border-foreground hover:border-foreground/30 hover:bg-foreground/5 active:scale-95 active:bg-foreground/10 active:border-foreground/30 transition-all duration-300 group select-none"
    >
      <PlusCircleIcon
        size={20}
        className="text-foreground group-hover:text-foreground/40 group-active:text-foreground/40 group-hover:rotate-90 group-active:rotate-90 transition-all duration-300"
      />
    </article>
  );
});

export { AgregarAlgo };
