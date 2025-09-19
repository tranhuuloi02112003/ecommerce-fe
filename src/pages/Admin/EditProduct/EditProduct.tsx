import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import Button from "@/components/Button/";
import { addProductSchema } from "@/utils/validation";
import { categoriesApi } from "@/services/categoriesApi";
import { colorsApi } from "@/services/colorsApi";
import { sizesApi } from "@/services/sizesApi";
import { filesApi } from "@/services/filesApi";
import { productsApi } from "@/services/productsApi";
import type { Category } from "@/types/category";
import type { Color } from "@/types/color";
import type { Size } from "@/types/size";

type EditProductFormData = z.infer<typeof addProductSchema>;

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Image upload state
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  // Colors state
  const [colors, setColors] = useState<Color[]>([]);
  const [loadingColors, setLoadingColors] = useState(false);
  const [isCreatingColor, setIsCreatingColor] = useState(false);

  // Sizes state
  const [sizes, setSizes] = useState<Size[]>([]);
  const [loadingSizes, setLoadingSizes] = useState(false);
  const [isCreatingSize, setIsCreatingSize] = useState(false);

  // Product loading state
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      stockQuantity: 0,
      colors: [],
      sizes: [],
      images: [],
    },
  });

  const watchedImages = watch("images") || [];

  useEffect(() => {
    if (!id) {
      toast.error("Product ID is missing");
      navigate("/admin/products");
      return;
    }

    const loadProduct = async () => {
      try {
        setIsLoadingProduct(true);
        const product = await productsApi.getProductById(id);

        setValue("name", product.name);
        setValue("description", product.description);
        setValue("category", product.categoryId);
        setValue("price", product.price);
        setValue("stockQuantity", product.stockQuantity);
        setValue("colors", product.colorIds);
        setValue("sizes", product.sizeIds);
        setValue("images", product.imageUrls);
      } catch (error) {
        console.error("Failed to load product:", error);
        toast.error("Failed to load product data");
        navigate("/admin/products");
      } finally {
        setIsLoadingProduct(false);
      }
    };

    loadProduct();
  }, [id, navigate, setValue]);

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

    const fetchColors = async () => {
      try {
        setLoadingColors(true);
        const colorsData = await colorsApi.getColors();
        setColors(colorsData);
      } catch (error) {
        console.error("Failed to fetch colors:", error);
        toast.error("Failed to load colors");
        setColors([]);
      } finally {
        setLoadingColors(false);
      }
    };

    const fetchSizes = async () => {
      try {
        setLoadingSizes(true);
        const sizesData = await sizesApi.getSizes();
        setSizes(sizesData);
      } catch (error) {
        console.error("Failed to fetch sizes:", error);
        toast.error("Failed to load sizes");
        setSizes([]);
      } finally {
        setLoadingSizes(false);
      }
    };

    fetchCategories();
    fetchColors();
    fetchSizes();
  }, []);

  // Convert categories to react-select options
  const categoryOptions: { label: string; value: string }[] = categories.map(
    (category) => ({
      value: category.id,
      label: category.name,
    })
  );

  // Convert colors to react-select options
  const colorOptions: { label: string; value: string }[] = colors.map(
    (color) => ({
      value: color.id,
      label: color.name,
    })
  );

  // Convert sizes to react-select options
  const sizeOptions: { label: string; value: string }[] = sizes.map((size) => ({
    value: size.id,
    label: size.name,
  }));

  const handleCreateCategory = async (inputValue: string) => {
    try {
      setIsCreatingCategory(true);
      const newCategory = await categoriesApi.createCategory(inputValue.trim());

      setCategories((prev) => [...prev, newCategory]);

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

  // Handle color selection ---------------
  const handleCreateColor = async (inputValue: string) => {
    try {
      setIsCreatingColor(true);
      const newColor = await colorsApi.createColor(inputValue.trim());

      setColors((prev) => [...prev, newColor]);

      const newOption: { label: string; value: string } = {
        value: newColor.id,
        label: newColor.name,
      };

      const currentColors = getValues("colors") || [];
      const updatedColors = [...currentColors, newColor.id];
      setValue("colors", updatedColors, { shouldValidate: true });

      toast.success(`Color "${newColor.name}" created successfully!`);
      return newOption;
    } catch (error) {
      console.error("Failed to create color:", error);
      toast.error("Failed to create color");
      throw error;
    } finally {
      setIsCreatingColor(false);
    }
  };

  // Handle Size selection ---------------
  const handleCreateSize = async (inputValue: string) => {
    try {
      setIsCreatingSize(true);
      const newSize = await sizesApi.createSize(inputValue.trim());

      setSizes((prev) => [...prev, newSize]);

      const newOption: { label: string; value: string } = {
        value: newSize.id,
        label: newSize.name,
      };

      const currentSizes = getValues("sizes") || [];
      const updatedSizes = [...currentSizes, newSize.id];
      setValue("sizes", updatedSizes, { shouldValidate: true });

      toast.success(`Size "${newSize.name}" created successfully!`);
      return newOption;
    } catch (error) {
      console.error("Failed to create size:", error);
      toast.error("Failed to create size");
      throw error;
    } finally {
      setIsCreatingSize(false);
    }
  };

  const onSubmit = async (data: EditProductFormData) => {
    if (!id) return;

    try {
      const productData = {
        name: data.name,
        description: data.description,
        categoryId: data.category,
        price: data.price,
        stockQuantity: data.stockQuantity,
        colorIds: data.colors,
        sizeIds: data.sizes,
        imageUrls: data.images,
      };

      const updatedProduct = await productsApi.updateProduct(id, productData);
      console.log("Updated product:", updatedProduct);

      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to update product";
      toast.error(errorMessage);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentImages = getValues("images") || [];
    const currentImageCount = currentImages.length;

    if (files.length > 4) {
      toast.error("You can only select maximum 4 images at once");
      e.target.value = "";
      return;
    }

    if (currentImageCount + files.length > 4) {
      const remaining = 4 - currentImageCount;
      toast.error(
        `You can only upload ${remaining} more image(s). You already have ${currentImageCount} image(s).`
      );
      e.target.value = "";
      return;
    }

    const validFiles = files;

    try {
      setIsUploadingImages(true);

      const uploadedUrls = await filesApi.uploadFiles(validFiles);

      const updatedImages = [...currentImages, ...uploadedUrls];
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

  // Loading state for product data
  if (isLoadingProduct) {
    return (
      <div className="min-h-screen">
        <main className="mx-auto w-full max-w-[1200px] py-8 px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-[48px] h-[48px] mx-auto mb-2 bg-blue-100 rounded-[8px] flex items-center justify-center">
                <div className="w-[24px] h-[24px] border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-[14px] text-blue-600 font-medium">
                Loading product...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-[1200px] py-8 px-4">
        {/* Breadcrumb */}
        <div className="mb-[16px] text-[12px] text-gray-500">
          Home &gt; All Products &gt; Edit Product
        </div>

        <h1 className="mb-[16px] text-[22px] font-semibold text-gray-900">
          Edit Product
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

              {/* Price and Stock Quantity */}
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
                    Stock Quantity
                  </label>
                  <input
                    {...register("stockQuantity", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    placeholder="0"
                    className="w-full px-[16px] py-[12px] border border-gray-200 rounded-[8px] text-[14px] outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  />
                  {errors.stockQuantity && (
                    <p className="mt-1 text-[12px] text-red-500">
                      {errors.stockQuantity.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Colors *
                </label>
                <Controller
                  name="colors"
                  control={control}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      isMulti
                      value={
                        field.value
                          ? colorOptions.filter((option) =>
                              field.value.includes(option.value)
                            )
                          : []
                      }
                      onChange={(options) => {
                        const selectedIds = options
                          ? options.map((option) => option.value)
                          : [];
                        field.onChange(selectedIds);
                      }}
                      onCreateOption={handleCreateColor}
                      options={colorOptions}
                      isLoading={loadingColors || isCreatingColor}
                      isDisabled={loadingColors}
                      placeholder={
                        loadingColors
                          ? "Loading colors..."
                          : "Select or type to create new colors"
                      }
                      formatCreateLabel={(inputValue) =>
                        `Create "${inputValue}"`
                      }
                      noOptionsMessage={() => "No colors found"}
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
                          color: "#9ca3af",
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: "#f3f4f6",
                          borderRadius: "6px",
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          fontSize: "14px",
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          ":hover": {
                            backgroundColor: "#ef4444",
                            color: "white",
                          },
                        }),
                      }}
                    />
                  )}
                />

                {errors.colors && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.colors.message}
                  </p>
                )}
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Sizes *
                </label>
                <Controller
                  name="sizes"
                  control={control}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      isMulti
                      value={
                        field.value
                          ? sizeOptions.filter((option) =>
                              field.value.includes(option.value)
                            )
                          : []
                      }
                      onChange={(options) => {
                        const selectedIds = options
                          ? options.map((option) => option.value)
                          : [];
                        field.onChange(selectedIds);
                      }}
                      onCreateOption={handleCreateSize}
                      options={sizeOptions}
                      isLoading={loadingSizes || isCreatingSize}
                      isDisabled={loadingSizes}
                      placeholder={
                        loadingSizes
                          ? "Loading sizes..."
                          : "Select or type to create new sizes"
                      }
                      formatCreateLabel={(inputValue) =>
                        `Create "${inputValue}"`
                      }
                      noOptionsMessage={() => "No sizes found"}
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
                          color: "#9ca3af",
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: "#f3f4f6",
                          borderRadius: "6px",
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          fontSize: "14px",
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          ":hover": {
                            backgroundColor: "#ef4444",
                            color: "white",
                          },
                        }),
                      }}
                    />
                  )}
                />

                {errors.sizes && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.sizes.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              {/* Main Image Preview */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="w-full h-[250px] border-2 border-dashed border-gray-300 rounded-[8px] bg-gray-50 flex items-center justify-center relative">
                  {isUploadingImages ? (
                    <div className="text-center">
                      <div className="w-[48px] h-[48px] mx-auto mb-2 bg-blue-100 rounded-[8px] flex items-center justify-center">
                        <div className="w-[24px] h-[24px] border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="text-[14px] text-blue-600 font-medium">
                        Uploading images...
                      </p>
                      <p className="text-[12px] text-gray-400">Please wait</p>
                    </div>
                  ) : watchedImages.length > 0 ? (
                    <img
                      src={watchedImages[0]}
                      alt="Main preview"
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                  ) : (
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
                  )}
                </div>
              </div>

              {/* Image Upload Input */}
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUploadingImages || watchedImages.length >= 4}
                  className="w-full px-[16px] py-[12px] border border-gray-200 rounded-[8px] text-[14px] outline-none focus:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="mt-1 text-[12px] text-gray-500">
                  {isUploadingImages
                    ? "Uploading images..."
                    : watchedImages.length >= 4
                    ? "Maximum 4 images reached"
                    : `Maximum 4 images allowed (${watchedImages.length}/4)`}
                </p>
                {errors.images && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.images.message}
                  </p>
                )}
              </div>

              {/* File List */}
              {watchedImages.length > 0 && (
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-2">
                    Product Images ({watchedImages.length}/4)
                  </label>
                  <div className="space-y-2">
                    {watchedImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200 group hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-medium text-gray-900 truncate">
                              {(() => {
                                try {
                                  // Extract filename from URL
                                  const url = new URL(imageUrl);
                                  const pathname = url.pathname;
                                  const segments = pathname.split("/");
                                  const lastSegment =
                                    segments[segments.length - 1];

                                  if (
                                    lastSegment &&
                                    lastSegment.includes(".")
                                  ) {
                                    return lastSegment;
                                  }

                                  return `Product Image ${index + 1}`;
                                } catch {
                                  return `Product Image ${index + 1}`;
                                }
                              })()}
                            </p>
                            <p className="text-[12px] text-gray-500">
                              Product image
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          disabled={isUploadingImages}
                          className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center text-[14px] font-bold shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/admin/products")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="admin"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
