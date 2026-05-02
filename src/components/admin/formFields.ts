export function setFormFieldValue(form: HTMLFormElement, fieldName: string, value: string) {
  const field = form.elements.namedItem(fieldName);

  if (!(field instanceof HTMLInputElement) && !(field instanceof HTMLTextAreaElement)) {
    return;
  }

  field.value = value;
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
}
