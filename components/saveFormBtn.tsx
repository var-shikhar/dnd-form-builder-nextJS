import { HiSaveAs } from "react-icons/hi"
import { Button } from "./ui/button"
import useDesigner from "./hooks/useDesigner"
import { UpdateFormContent } from "@/actions/forms"
import { toast } from "./ui/use-toast"
import { useTransition } from "react"
import { FaSpinner } from "react-icons/fa"

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner()
  const [loading, startTransition] = useTransition()

  const updateFormContext = async () => {
    try {
      const JSONElement = JSON.stringify(elements)
      await UpdateFormContent(id, JSONElement)
      toast({
        title: "Success",
        description: "Your form has been saved",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateFormContext)}
    >
      <HiSaveAs className="h-6 w-6" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  )
}
export default SaveFormBtn
