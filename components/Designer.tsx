"use client"

import { cn } from "@/lib/utils"
import DesignerSidebar from "./DesignerSidebar"
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core"
import { useState } from "react"
import { FormElementInstance, FormElements } from "./FormElements"
import useDesigner from "./hooks/useDesigner"
import { idGenerator } from "@/lib/idGenerator"
import { Button } from "./ui/button"
import { BiSolidTrash } from "react-icons/bi"

function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner()
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  })
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event

      if (!active || !over) {
        return
      }
      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement
      const isDroppingOverDesignerDropArea =
        over.data.current?.isDesignerDropArea

      // First Scenario dropping over the designer drop area
      const droppingSiderbarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea
      if (droppingSiderbarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        )

        addElement(elements.length, newElement)
        return
      }

      // Second Scenario
      const isDroppingOverDesignerElementTopHalf =
        over?.data.current?.isTopHalfDesignerElement
      const isDroppingOverDesignerElementBottomHalf =
        over?.data.current?.isBottomHalfDesignerElement

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf

      if (isDroppingOverDesignerElement) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        )
        const overID = over.data?.current?.elementId
        const overElementIndex = elements.findIndex((et) => et.id === overID)
        if (overElementIndex === -1) {
          throw new Error("Element not found")
        }

        let indexForNewElement = overElementIndex
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1
        }

        addElement(indexForNewElement, newElement)
        return
      }

      // Third Element  This code was giving some error hence commented.
      // const isDraggingDesignerElement = active?.data?.current?.isDesignerElement
      // const draggingDesignerElementOverAnotherDesignerElement =
      //   isDroppingOverDesignerElement || isDraggingDesignerElement

      // console.log(active)
      // console.log(over)
      // if (draggingDesignerElementOverAnotherDesignerElement) {
      //   const activeID = active.data?.current?.elementId
      //   const overID = over?.data?.current?.elementId

      //   const activeElementIndex = elements.findIndex(
      //     (et) => et.id === activeID
      //   )
      //   const overElementIndex = elements.findIndex((et) => et.id === overID)

      //   if (activeElementIndex === -1 || overElementIndex === -1) {
      //     throw new Error("Element not found")
      //   }

      //   const activeElement = { ...elements[activeElementIndex] }
      //   removeElement(activeID)

      //   let indexForNewElement = overElementIndex
      //   if (isDroppingOverDesignerElementBottomHalf) {
      //     indexForNewElement = overElementIndex + 1
      //   }

      //   addElement(indexForNewElement, activeElement)
      // }
    },
  })
  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null)
          }
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 max-w-[920px]",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-forground flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="rounded-md bg-primary/20 h-[120px]"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner()
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  })
  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  })
  const DesignerElement = FormElements[element.type].designerComponent
  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  })
  if (draggable.isDragging) return null
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute  w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md"
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="h-full flex justify-center border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation()
                removeElement(element.id)
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm text-center">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none"></div>
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none"></div>
      )}
    </div>
  )
}

export default Designer
