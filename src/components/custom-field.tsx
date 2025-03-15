import { capitalizeFirstChar } from "@/lib/utils";
import { FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type CustomFieldProps = {
  field: string;
  defaultValue?: FormDataEntryValue | undefined;
  error: string[] | undefined;
  type?: string;
};
export default function CustomField({
  field,
  defaultValue,
  error,
  type,
}: CustomFieldProps) {
  return (
    <FormItem>
      <Label className={error ? "text-red-500" : ""} htmlFor={field}>
        {capitalizeFirstChar(field)}
      </Label>
      <Input
        id={field}
        type={type ?? "text"}
        name={field}
        defaultValue={defaultValue as string | undefined}
        className={error ? "border-red-500" : ""}
        aria-describedby={`${field}-error`}
      />
      {error && (
        <p
          id={`${field}-error`}
          className="text-sm text-red-500"
          aria-live="polite"
        >
          {error[0]}
        </p>
      )}
    </FormItem>
  );
}
