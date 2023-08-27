
export interface OptionalFormFields {
  custom_code?: string,
  expiration_date?: string | number
}

export interface FormFields extends OptionalFormFields{
  original_url: string
}