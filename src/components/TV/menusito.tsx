import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function Menusito() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant={"ghost"} className="rounded-full p-0">
          <img src="petm.png" alt="" className=" w-10 h-10 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100 "/>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col">
          <button className="border-2 trasnsition delay-75 hover:bg-sky-200 focus:bg-sky-300 border-sky-200"><a href="">Panel de Control</a></button>
          <button className="border-2 trasnsition delay-75 hover:bg-sky-200 focus:bg-sky-300 border-sky-200"><a href="">Estadisticas</a></button>
          <button className="border-2 trasnsition delay-75 hover:bg-sky-200 focus:bg-sky-300 border-sky-200"><a href="">Registros</a></button>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
