"use client"

import { HiCursorClick } from "react-icons/hi"
import { FormElementInstance, FormElements } from "./FormElements"
import { Button } from "./ui/button"
import { useCallback, useRef, useState, useTransition } from "react"
import { toast } from "./ui/use-toast"
import { ImSpinner2 } from "react-icons/im"
import { SubmitForm } from "@/actions/forms"

function FormSubmitComponent({
  formUrl,
  content,
}: {
  formUrl: string
  content: FormElementInstance[]
}) {
  const formValues = useRef<{ [key: string]: string }>({})
  const formError = useRef<{ [key: string]: boolean }>({})
  const [renderKey, setRenderKey] = useState(new Date().getTime())

  const [submitted, setSubmitted] = useState(false)
  const [pending, startTransition] = useTransition()

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || ""
      const valid = FormElements[field.type].validate(field, actualValue)

      if (!valid) {
        formError.current[field.id] = true
      }
    }
    if (Object.keys(formError.current).length > 0) {
      return false
    }
    return true
  }, [content])

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value
  }, [])
  const submitForm = async () => {
    formError.current = {}
    const validForm = validateForm()
    if (!validForm) {
      setRenderKey(new Date().getTime())
      toast({
        title: "Error",
        description: "Please check your form for errors",
        variant: "destructive",
      })
      return
    }
    try {
      const jsonContent = JSON.stringify(formValues.current)
      await SubmitForm(formUrl, jsonContent)
      setSubmitted(true)
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
    console.log("Form Values", formValues.current)
  }
  if (submitted) {
    return (
      <div className="flex w-full justify-center h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-3xl font-bold">Form Submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close the page now.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded max-w-[620px]"
      >
        {content.map((element) => {
          const CustomForm = FormElements[element.type].formComponent
          return (
            <CustomForm
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formError.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          )
        })}
        <Button
          className="mt-8"
          disabled={pending}
          onClick={() => {
            startTransition(submitForm)
          }}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && (
            <>
              <ImSpinner2 className="animate-spin" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default FormSubmitComponent
