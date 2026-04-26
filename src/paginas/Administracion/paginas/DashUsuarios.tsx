import { Pagination } from "@/components/shared/Pagination";
import { Separator } from "@/components/ui/separator";
import { useUsuariosHook } from "@/hooks/actions-hooks/useUsuariosHook";

const DashUsuarios = () => {
  const { data } = useUsuariosHook({ full: true });

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <article className="flex-7 min-h-0">
        <div className="h-full flex flex-col overflow-y-auto">
          p
        </div>
      </article>
      <Separator />
      <Pagination total={data?.meta?.total || 0} />
    </section>
  );
};

export default DashUsuarios;
