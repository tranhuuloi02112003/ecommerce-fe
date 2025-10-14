import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import { TextInput } from "@/components/FormInputs";
import { addressApi } from "@/services";
import { Modal } from "@/components/Modal";
import { type AddressFormData, addressSchema } from "@/utils/validation";
import type { Address } from "@/types/address";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: Address | null;
  onAddressUpdated: () => void;
}

const AddressModal = ({
  isOpen,
  onClose,
  address,
  onAddressUpdated,
}: AddressModalProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      phone: "",
      streetAddress: "",
      city: "",
    },
  });

  useEffect(() => {
    if (address) {
      reset({
        name: address.name,
        phone: address.phone,
        streetAddress: address.streetAddress,
        city: address.city,
      });
    } else {
      reset({
        name: "",
        phone: "",
        streetAddress: "",
        city: "",
      });
    }
  }, [address, reset]);

  const onSubmit = async (data: AddressFormData) => {
    try {
      setLoading(true);

      if (address) {
        await addressApi.updateAddress(address.id, data);
        toast.success("Address updated successfully");
      } else {
        await addressApi.createAddress(data);
        toast.success("Address added successfully");
      }

      onAddressUpdated();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save address"
      );
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput
        label="Full Name"
        name="name"
        register={register}
        error={errors.name}
        placeholder="Your full name"
        disabled={loading}
      />

      <TextInput
        label="Phone Number"
        name="phone"
        register={register}
        error={errors.phone}
        placeholder="Your phone number"
        disabled={loading}
      />

      <TextInput
        label="Street Address"
        name="streetAddress"
        register={register}
        error={errors.streetAddress}
        placeholder="Street address, house number, etc."
        disabled={loading}
      />

      <TextInput
        label="City"
        name="city"
        register={register}
        error={errors.city}
        placeholder="City"
        disabled={loading}
      />
    </form>
  );

  const footer = (
    <div className="flex justify-end space-x-3">
      <Button
        variant="outline"
        type="button"
        onClick={onClose}
        disabled={loading}
        className="w-[160px]"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        className="w-[160px]"
      >
        {loading ? "Saving..." : "Save Address"}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={address ? "Edit Address" : "Add New Address"}
      size="xl"
      footer={footer}
    >
      {content}
    </Modal>
  );
};

export default AddressModal;
