import { Pagination } from "@/components/shared/Pagination";
import { Separator } from "@/components/ui/separator";

const DashUsuarios = () => {
  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <article className="flex-7 min-h-0">
        <div className="h-full flex flex-col overflow-y-auto">
          p
        </div>
      </article>
      <Separator />
      <Pagination total={230} />
    </section>
  );
};

export default DashUsuarios;
