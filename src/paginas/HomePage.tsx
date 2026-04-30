import { SeccionAusencias } from "@/components/TV/SeccionAusencias";
import { SeccionEventos } from "@/components/TV/SeccionEventos";
import { SeccionNoticias } from "@/components/TV/SeccionNoticias";
import {Menusito} from "@/components/TV/menusito";
export const Tv = () => {


    return (
        <section className="w-screen h-screen flex flex-col md:flex-row overflow-hidden bg-linear-to-tl from-indigo-900 via-blue-400 to-slate-200">
         <Menusito />
            {/* Noticias */}
            <SeccionNoticias />

            {/* Panel derecho */}
            <section className="w-2/6 flex flex-col p-4 gap-3 h-full">
                <SeccionAusencias />
                <SeccionEventos />
            </section>
        </section>
    );
};