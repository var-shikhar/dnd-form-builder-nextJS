"use client"

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react"
import { FormElementInstance } from "../FormElements"

type DesingerContextType = {
  elements: FormElementInstance[]
  setElement: Dispatch<SetStateAction<FormElementInstance[]>>
  addElement: (index: number, element: FormElementInstance) => void
  removeElement: (id: string) => void
  selectedElement: FormElementInstance | null
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>

  updateElement: (id: string, element: FormElementInstance) => void
}

export const DesignerContext = createContext<DesingerContextType | null>(null)

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [elements, setElement] = useState<FormElementInstance[]>([])
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null)
  const addElement = (index: number, element: FormElementInstance) => {
    setElement((prev) => {
      const newElement = [...prev]
      newElement.splice(index, 0, element)
      return newElement
    })
  }
  const removeElement = (id: string) => {
    console.log("This remove has initiated")
    console.log(id)
    setElement((prev) => prev.filter((element) => element.id !== id))
  }

  const updateElement = (id: string, element: FormElementInstance) => {
    setElement((prev) => {
      const newElement = [...prev]
      const index = newElement.findIndex((e) => e.id === id)
      newElement[index] = element
      return newElement
    })
  }
  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElement,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  )
}
