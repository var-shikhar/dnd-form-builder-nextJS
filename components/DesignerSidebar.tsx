import FormElementSidbar from "./FormElementSidebar"
import { FormElements } from "./FormElements"
import PropertiesFormSidbar from "./PropertiesFormSidbar"
import SidebarBtnElement from "./SidebarBtnElement"
import useDesigner from "./hooks/useDesigner"

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner()
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementSidbar />}
      {selectedElement && <PropertiesFormSidbar />}
    </aside>
  )
}

export default DesignerSidebar
