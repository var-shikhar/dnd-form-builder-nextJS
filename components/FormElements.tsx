import React from "react"
import { TextFieldFormElement } from "./fields/TextFields"
import { TitleFieldFormElement } from "./fields/TitleField"
import { SubTitleFieldFormElement } from "./fields/SubTitle"
import { ParagraphFieldFormElement } from "./fields/ParagraphField"
import { SeparatorFieldFormElement } from "./fields/SeparatorField"
import { SpacerFieldFormElement } from "./fields/SpacerField"
import { NumberFieldFormElement } from "./fields/NumberField"
import { TextareaFormElement } from "./fields/TextAreaField"
import { DateFieldFormElement } from "./fields/DateField"
import { SelectFieldFormElement } from "./fields/SelectElement"
import { CheckboxFieldFormElement } from "./fields/CheckBoxField"

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckBoxField"

export type SubmitFunction = (key: string, value: string) => void

export type FormElement = {
  type: ElementsType

  construct: (id: string) => FormElementInstance
  designerBtnElement: {
    icon: React.ElementType
    label: string
  }
  designerComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
  formComponent: React.FC<{
    elementInstance: FormElementInstance
    submitValue?: SubmitFunction
    isInvalid?: boolean
    defaultValue?: string
  }>
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
  validate: (formElement: FormElementInstance, currentValue: string) => boolean
}

export type FormElementInstance = {
  id: string
  type: ElementsType
  extraAttributes?: Record<string, any>
}

type FromElementsType = {
  [key in ElementsType]: FormElement
}
export const FormElements: FromElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextareaFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckBoxField: CheckboxFieldFormElement,
}
