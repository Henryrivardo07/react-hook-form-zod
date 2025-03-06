// Komponen utama form registrasi
import { useForm, Controller } from "react-hook-form"; // Menggunakan useForm dan Controller dari React Hook Form
import { zodResolver } from "@hookform/resolvers/zod"; // Menggunakan Zod sebagai resolver
import Select from "react-select"; // Library untuk dropdown custom
import FormInput from "./FormInput"; // Import komponen FormInput
import { countryOptions } from "../utils/countries"; // Import daftar negara
import { registrationSchema, FormData } from "../utils/validation"; // Import validasi dari Zod

const RegistrationForm = () => {
  // Menggunakan useForm dengan zodResolver untuk validasi
  const {
    register, // Fungsi untuk mendaftarkan input
    handleSubmit, // Fungsi untuk menangani submit form
    control, // Digunakan untuk input yang dikendalikan (controlled components)
    formState: { errors }, // Mengakses pesan error validasi
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: undefined, // Set default ke null agar tidak error saat pertama kali render
      terms: false,
    },
  });

  // Fungsi yang dipanggil saat form dikirim
  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Input First Name */}
      <FormInput label="First Name" error={errors.firstName?.message}>
        <input {...register("firstName", { required: "First name is required" })} className="w-full p-2 border rounded-md" />
      </FormInput>

      {/* Input Last Name */}
      <FormInput label="Last Name" error={errors.lastName?.message}>
        <input {...register("lastName", { required: "Last name is required" })} className="w-full p-2 border rounded-md" />
      </FormInput>

      {/* Input Email */}
      <FormInput label="Email" error={errors.email?.message}>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex untuk validasi email
              message: "Invalid email address",
            },
          })}
          className="w-full p-2 border rounded-md"
        />
      </FormInput>

      {/* Dropdown Country menggunakan Controller */}
      <FormInput label="Country" error={errors.country?.message}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={countryOptions}
              value={field.value || undefined} // Pastikan null tetap bisa di-handle
              onChange={(selected) => field.onChange(selected)}
              className="w-full"
            />
          )}
        />
      </FormInput>

      {/* Checkbox Terms & Conditions */}
      <div className="flex items-center">
        <input type="checkbox" {...register("terms", { required: "You must accept the terms" })} className="mr-2" />
        <label className="text-sm">I accept the terms and conditions</label>
      </div>
      {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

      {/* Tombol Submit */}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
