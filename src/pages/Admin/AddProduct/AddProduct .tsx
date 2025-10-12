import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import Button from "@/components/Button/";
import { addProductSchema } from "@/utils/validation";
import { categoriesApi } from "@/services/categoriesApi";
import { filesApi } from "@/services/filesApi";
import { productsApi } from "@/services/productsApi";
import type { Category } from "@/types/category";

type AddProductFormData = z.infer<typeof addProductSchema>;

const AddProduct = () => {
  // Image upload state
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      quantity: 0,
      images: [],
    },
  });

  // Watch images field from RHF
  const watchedImages = watch("images") || [];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const categoriesData = await categoriesApi.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Convert categories to react-select options
  const categoryOptions: { label: string; value: string }[] = categories.map(
    (category) => ({
      value: category.id,
      label: category.name,
    })
  );

  const handleCreateCategory = async (inputValue: string) => {
    try {
      setIsCreatingCategory(true);
      const newCategory = await categoriesApi.createCategory(inputValue.trim());

      setCategories((prev) => [...prev, newCategory]);

      // Set as selected option
      const newOption: { label: string; value: string } = {
        value: newCategory.id,
        label: newCategory.name,
      };

      setValue("category", newOption.value, { shouldValidate: true });

      toast.success(`Category "${newCategory.name}" created successfully!`);
      return newOption;
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Failed to create category");
      throw error;
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const onSubmit = async (data: AddProductFormData) => {
    try {
      const productData = {
        name: data.name,
        description: data.description,
        categoryId: data.category,
        price: data.price,
        quantity: data.quantity,
        imageKeys: data.images.map(img => img.key), // Extract the key from each image to match API expectations
      };

      await productsApi.createProduct(productData);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to add product";
      toast.error(errorMessage);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentImages = getValues("images") || [];
    const currentImageCount = currentImages.length;

    // Nếu đã có 4 ảnh, thay thế toàn bộ
    if (currentImageCount >= 4) {
      if (files.length > 4) {
        toast.error("You can only select maximum 4 images to replace");
        e.target.value = "";
        return;
      }

      try {
        setIsUploadingImages(true);
        const uploadedFiles = await filesApi.uploadFiles(files);


        const newImages = uploadedFiles.slice(0, 4).map(file => ({
          key: file.key,
          url: file.url
        }));
        setValue("images", newImages, { shouldValidate: true });

        toast.success(`${files.length} image(s) replaced successfully!`);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed, please try again");
      } finally {
        setIsUploadingImages(false);
        e.target.value = "";
      }
      return;
    }

    // Nếu chưa đủ 4 ảnh, thêm ảnh mới
    if (currentImageCount + files.length > 4) {
      const remaining = 4 - currentImageCount;
      toast.error(
        `You can only upload ${remaining} more image(s). You need exactly 4 images total.`
      );
      e.target.value = "";
      return;
    }

    const validFiles = files;

    try {
      setIsUploadingImages(true);

      const uploadedFiles = await filesApi.uploadFiles(validFiles);
      
      const newImages = uploadedFiles.map(file => ({
        key: file.key,
        url: file.url
      }));

      const updatedImages = [...currentImages, ...newImages];
      setValue("images", updatedImages, { shouldValidate: true });

      toast.success(`${validFiles.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed, please try again");
    } finally {
      setIsUploadingImages(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const currentImages = getValues("images") || [];

    const updatedImages = currentImages.filter((_, i) => i !== index);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-[1200px] py-8 px-4">
        {/* Breadcrumb */}
        <div className="mb-[16px] text-[12px] text-gray-500">
          Home &gt; All Products &gt; Add New Product
        </div>

        <h1 className="mb-[16px] text-[22px] font-semibold text-gray-900">
          Product Details
        </h1>

        <div className="p-[24px] bg-gray-50 rounded-2xl ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Type name here"
                  className="w-full px-[16px] py-[12px] border border-gray-200 rounded-[8px] text-[14px] outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                />
                {errors.name && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Type description here"
                  rows={4}
                  className="w-full px-[16px] py-[12px] border border-gray-200 rounded-[8px] text-[14px] outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none"
                />
                {errors.description && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      value={
                        field.value
                          ? categoryOptions.find(
                              (option) => option.value === field.value
                            )
                          : null
                      }
                      onChange={(option) => field.onChange(option?.value || "")}
                      onCreateOption={handleCreateCategory}
                      options={categoryOptions}
                      isLoading={loadingCategories || isCreatingCategory}
                      isDisabled={loadingCategories}
                      placeholder={
                        loadingCategories
                          ? "Loading categories..."
                          : "Select or type to create new category"
                      }
                      formatCreateLabel={(inputValue) =>
                        `Create "${inputValue}"`
                      }
                      noOptionsMessage={() => "No categories found"}
                      isClearable
                      classNamePrefix="rs"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minHeight: "44px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "14px",
                          "&:hover": {
                            borderColor: "#9ca3af",
                          },
                          "&:focus-within": {
                            borderColor: "#9ca3af",
                            boxShadow: "0 0 0 1px #9ca3af",
                          },
                        }),
                        placeholder: (base) => ({
                          ...base,
                        }),
                      }}
                    />
                  )}
                />

                {errors.category && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Price and Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    {...register("price", { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full px-[16px] py-[12px] border border-gray-200 rounded-[8px] text-[14px] outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  />
                  {errors.price && (
                    <p className="mt-1 text-[12px] text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    {...register("quantity", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    placeholder="0"
                    className="w-full px-[16px] py-[12px] border border-gray-200 rounded-[8px] text-[14px] outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-[12px] text-red-500">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              {/* Image Preview Grid */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="w-full h-[250px] border-2 border-dashed border-gray-300 rounded-[8px] bg-gray-50 relative">
                  {isUploadingImages ? (
                    <div className="flex items-center justify-center h-full w-full">
                      <div className="text-center">
                        <div className="w-[48px] h-[48px] mx-auto mb-2 bg-blue-100 rounded-[8px] flex items-center justify-center">
                          <div className="w-[24px] h-[24px] border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-[14px] text-blue-600 font-medium">
                          Uploading images...
                        </p>
                        <p className="text-[12px] text-gray-400">Please wait</p>
                      </div>
                    </div>
                  ) : watchedImages.length > 0 ? (
                    <div className="grid grid-cols-2 grid-rows-2 h-full gap-1 p-1">
                      {Array(4).fill(null).map((_, index) => (
                        <div 
                          key={index} 
                          className="relative bg-gray-100 rounded-md overflow-hidden flex items-center justify-center group cursor-pointer"
                        >
                          {index < watchedImages.length ? (
                            <>
                              <div className="relative w-full h-full">
                                <img
                                  src={watchedImages[index].url}
                                  alt={`Product image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 hover:opacity-100 transition-all duration-200 flex items-center justify-center text-[12px] font-bold shadow-sm z-10"
                              >
                                ×
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center justify-center h-full w-full text-gray-300">
                              <svg
                                className="w-[24px] h-[24px]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <div className="text-center">
                        <div className="w-[48px] h-[48px] mx-auto mb-2 bg-gray-200 rounded-[8px] flex items-center justify-center">
                          <svg
                            className="w-[24px] h-[24px] text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-[14px] text-gray-500">
                          Drop your images here, or browse
                        </p>
                        <p className="text-[12px] text-gray-400">
                          jpeg, png are allowed
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Upload Input */}
              <div>
                <div className="relative">
                  <input
                    type="file"
                    id="file-input"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploadingImages}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-input"
                    className={`flex items-center justify-center w-full px-[16px] py-[12px] border border-gray-200 rounded-[8px] text-[14px] cursor-pointer ${
                      isUploadingImages ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    {isUploadingImages ? "Uploading..." : "Choose Images"}
                  </label>
                </div>
              </div>

              {/* Image Upload Status */}
              <div>
                <p className={`text-sm ${watchedImages.length === 4 ? 'text-green-600' : 'text-gray-500'}`}>
                  {isUploadingImages
                    ? "Uploading images..."
                    : watchedImages.length >= 4
                    ? "✓ All required images uploaded (4/4)"
                    : `Upload status: ${watchedImages.length}/4 images`}
                </p>
                {errors.images && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.images.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="admin"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
