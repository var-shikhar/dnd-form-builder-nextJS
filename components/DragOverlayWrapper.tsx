import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react"
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement"
import { ElementsType, FormElements } from "./FormElements"
import useDesigner from "./hooks/useDesigner"

const DragOverlayWrapper = () => {
  const { elements } = useDesigner()
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: (event) => {
      setDraggedItem(null)
    },
    onDragEnd: (event) => {
      setDraggedItem(null)
    },
  })
  if (!draggedItem) return null

  let node = <div>No drag overlay</div>
  const isSidebarBtnElement = draggedItem?.data.current?.isDesignerBtnElement
  if (isSidebarBtnElement) {
    const type = draggedItem?.data.current?.type as ElementsType
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
  }

  const isDesignerBtnElement = draggedItem?.data.current?.isDesignerElement
  if (isDesignerBtnElement) {
    const elementId = draggedItem?.data.current?.elementId
    const element = elements.find((e) => e.id === elementId)

    if (!element) node = <div>Element not found!</div>
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      )
    }
  }
  return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper
