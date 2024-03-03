import { MdOutlinePublish } from "react-icons/md"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { FaIcons, FaSpinner } from "react-icons/fa"
import { useTransition } from "react"
import { toast } from "./ui/use-toast"
import { PublishForm } from "@/actions/forms"
import { useRouter } from "next/navigation"

function PublishFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition()
  const router = useRouter()

  async function publishForm() {
    try {
      await PublishForm(id)
      toast({
        title: "Success",
        description: "Your form is now available to the public!",
      })
      router.refresh()
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong!",
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can be undone. After publishing, you can't be able to
            edit this form?
            <br />
            <span>
              By publishing this form, you make it available to the public and
              you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
              startTransition(publishForm)
            }}
          >
            Proceed {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default PublishFormBtn
