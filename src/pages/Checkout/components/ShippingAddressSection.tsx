import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import AddressModal from "./AddressModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { addressApi } from "@/services";
import type { Address } from "@/types/address";

interface ShippingAddressSectionProps {
  selectedAddressId: string | null;
  onAddressSelect: (addressId: string) => void;
}

const ShippingAddressSection = ({
  selectedAddressId,
  onAddressSelect,
}: ShippingAddressSectionProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showAllAddresses, setShowAllAddresses] = useState<boolean>(false);

  // State for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const addressesData = await addressApi.getAddresses();
      setAddresses(addressesData);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      onAddressSelect(
        addresses.find((a) => a.defaultAddress)?.id || addresses[0].id
      );
    }
  }, [addresses, selectedAddressId, onAddressSelect]);

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      setLoading(true);
      await addressApi.setDefaultAddress(addressId);

      setAddresses((prevAddresses) =>
        prevAddresses.map((addr) => ({
          ...addr,
          defaultAddress: addr.id === addressId,
        }))
      );

      toast.success("Default address updated");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update default address"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = (addressId: string, addressName: string) => {
    setAddressToDelete({ id: addressId, name: addressName });
    setIsDeleteModalOpen(true);
  };

  const handleAddressDeleted = async () => {
    if (!addressToDelete) return;

    try {
      setLoading(true);
      await addressApi.deleteAddress(addressToDelete.id);

      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.id !== addressToDelete.id)
      );

      toast.success("Address deleted successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete address"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  return (
    <>
      <div className="mb-[32px]">
        <div className="mb-[16px] flex items-center justify-between">
          <h2 className="text-[18px] font-medium text-gray-900">
            Shipping Address
          </h2>
          <Button
            variant="outline"
            className="w-[200px] !h-[42px] text-gray-700"
            onClick={handleAddAddress}
          >
            Add New Address
          </Button>
        </div>

        {/* Collapsible Address Section */}
        <div className="space-y-[12px]">
          {selectedAddressId &&
            addresses.find((a) => a.id === selectedAddressId) && (
              <div className="rounded-[8px] border border-gray-200 p-[16px]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-[8px]">
                    <div className="h-[20px] w-[20px] rounded-full flex items-center justify-center bg-[#DB4444] text-white">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-[16px]">
                      {addresses.find((a) => a.id === selectedAddressId)?.name}
                    </span>
                    {addresses.find((a) => a.id === selectedAddressId)
                      ?.defaultAddress && (
                      <span className="rounded-[4px] bg-gray-100 px-[8px] py-[2px] text-[12px] text-gray-600">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-[12px] text-[14px]">
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        const address = addresses.find(
                          (a) => a.id === selectedAddressId
                        );
                        if (address) handleEditAddress(address);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="mt-[8px] text-[14px] text-gray-600">
                  {
                    addresses.find((a) => a.id === selectedAddressId)
                      ?.streetAddress
                  }
                  , {addresses.find((a) => a.id === selectedAddressId)?.city}
                </div>
                <div className="mt-[4px] text-[14px] text-gray-600">
                  {addresses.find((a) => a.id === selectedAddressId)?.phone}
                </div>
                <button
                  onClick={() => setShowAllAddresses((prev) => !prev)}
                  className="mt-[12px] text-blue-600 hover:text-blue-800 text-[14px] flex items-center"
                >
                  <span>Change Address</span>
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}

          {/* Address Selection List (Shown when expanded) */}
          {showAllAddresses && (
            <div className="border rounded-[8px] border-gray-200 p-[16px]">
              <h3 className="font-medium text-[16px] mb-[12px]">
                Select Shipping Address
              </h3>
              <div className="space-y-[12px]">
                {addresses
                  .filter((address) => address.id !== selectedAddressId)
                  .map((address) => (
                    <div
                      key={address.id}
                      className="rounded-[8px] border border-gray-200 hover:border-gray-300 p-[16px] cursor-pointer"
                      onClick={() => {
                        onAddressSelect(address.id);
                        setShowAllAddresses(false);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-[8px]">
                          <div className="h-[20px] w-[20px] rounded-full flex items-center justify-center border border-gray-300"></div>
                          <span className="font-medium text-[16px]">
                            {address.name}
                          </span>
                          {address.defaultAddress && (
                            <span className="rounded-[4px] bg-gray-100 px-[8px] py-[2px] text-[12px] text-gray-600">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-[12px] text-[14px]">
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                          >
                            Edit
                          </button>
                          {!address.defaultAddress && (
                            <>
                              <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSetDefaultAddress(address.id);
                                }}
                              >
                                Set Default
                              </button>
                              <button
                                className="text-red-600 hover:text-red-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAddress(address.id, address.name);
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="mt-[8px] text-[14px] text-gray-600">
                        {address.streetAddress}, {address.city}
                      </div>
                      <div className="mt-[4px] text-[14px] text-gray-600">
                        {address.phone}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {selectedAddressId === null && (
            <div className="rounded-[8px] border border-dashed border-gray-300 p-[24px] text-center">
              <p className="text-gray-500">
                No address selected. Please select an address or add a new one.
              </p>
            </div>
          )}
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        address={editingAddress}
        onAddressUpdated={() => {
          fetchAddresses();
        }}
      />

      {/* Delete Address Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAddressToDelete(null);
        }}
        onConfirm={() => {
          handleAddressDeleted();
          setIsDeleteModalOpen(false);
          setAddressToDelete(null);
        }}
        itemName={addressToDelete?.name || ""}
        itemType="address"
        isLoading={loading}
      />
    </>
  );
};

export default ShippingAddressSection;
