import { useDraggable } from "@dnd-kit/core"
import { FormElement } from "./FormElements"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  })
  return (
    <Button
      ref={draggable.setNodeRef}
      className={cn(
        "flex flex-col gap-2 cursor-grab h-[120px] w-[120px]",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      variant={"outline"}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement
}) => {
  const { label, icon: Icon } = formElement.designerBtnElement
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  })
  return (
    <Button
      className="flex flex-col gap-2 cursor-grab h-[120px] w-[120px]"
      variant={"outline"}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export default SidebarBtnElement
