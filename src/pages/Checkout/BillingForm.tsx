import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { checkoutSchema, type CheckoutForm } from "@/utils/validation";
import { TextInput, TextAreaInput } from "@/components/FormInputs";

type BillingFormProps = { onSubmit: (data: CheckoutForm) => void };

export default function BillingForm({ onSubmit }: BillingFormProps) {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      streetAddress: "",
      phone: "",
      email: "",
      note: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue(
        "firstName",
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      );
      setValue("email", user.email ?? "");
      setValue("streetAddress", user.address ?? "");
    }
  }, [user, setValue]);

  const submitHandler = (data: CheckoutForm) => onSubmit(data);

  return (
    <form
      id="billing-form"
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6"
      noValidate
    >
      <TextInput
        label="Name *"
        name="firstName"
        register={register}
        error={errors.firstName}
        placeholder="Your full name"
      />

      <TextInput
        label="Street Address *"
        name="streetAddress"
        register={register}
        error={errors.streetAddress}
        placeholder="House number and street name"
      />

      <TextInput
        label="Phone *"
        name="phone"
        register={register}
        error={errors.phone}
        type="tel"
        placeholder="Your phone number"
      />

      <TextInput
        label="Email *"
        name="email"
        register={register}
        error={errors.email}
        type="email"
        placeholder="Your email address"
      />

      <TextAreaInput
        label="Order Notes"
        name="note"
        register={register}
        error={errors.note}
        placeholder="Notes about your order, e.g. special notes for delivery"
        rows={4}
      />
    </form>
  );
}
