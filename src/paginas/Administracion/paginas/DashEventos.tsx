import { Pagination } from "@/components/shared/Pagination";
import { Separator } from "@/components/ui/separator";
import { useEventosHook } from "@/hooks/actions-hooks/useEventosHook";

const DashEventos = () => {
  const { data } = useEventosHook({ full: true });

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <article className="flex-7 min-h-0">
        <div className="h-full flex flex-col overflow-y-auto">
          Eventos
        </div>
      </article>
      <Separator />
      <Pagination total={data?.meta?.total || 0} />
    </section>
  )
};

export default DashEventos;
