import { GetFormContentByURL } from "@/actions/forms"
import { FormElementInstance } from "@/components/FormElements"
import FormSubmitComponent from "@/components/FormSubmitComponent"

async function SubmitPage({ params }: { params: { formUrl: string } }) {
  const form = await GetFormContentByURL(params.formUrl)

  if (!form) {
    throw new Error("Form not found")
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[]

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />
}

export default SubmitPage
