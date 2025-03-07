// Komponen utama form registrasi
import { useForm, Controller } from "react-hook-form"; // Menggunakan useForm dan Controller dari React Hook Form
import { zodResolver } from "@hookform/resolvers/zod"; // Menggunakan Zod sebagai resolver
import Select from "react-select"; // Library untuk dropdown custom
import FormInput from "./FormInput"; // Import komponen FormInput
import { countryOptions } from "../utils/countries"; // Import daftar negara
import { registrationSchema, FormData } from "../utils/validation"; // Import validasi dari Zod

const RegistrationForm = () => {
  const {
    register, // Untuk menghubungkan input dengan React Hook Form
    handleSubmit, // Menangani submit form
    control, // Digunakan untuk input yang dikontrol seperti Select
    formState: { errors }, // Menyimpan error validasi
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema), // Menghubungkan validasi dengan Zod
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: undefined,
      terms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data); // Menampilkan data yang dikirim ke konsol
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Input First Name */}
      <FormInput label="First Name" error={errors.firstName?.message}>
        <input {...register("firstName")} className="w-full p-2 border rounded-md" />
      </FormInput>

      {/* Input Last Name */}
      <FormInput label="Last Name" error={errors.lastName?.message}>
        <input {...register("lastName")} className="w-full p-2 border rounded-md" />
      </FormInput>

      {/* Input Email */}
      <FormInput label="Email" error={errors.email?.message}>
        <input type="email" {...register("email")} className="w-full p-2 border rounded-md" />
      </FormInput>

      {/* Input Password */}
      <FormInput label="Password" error={errors.password?.message}>
        <input type="password" {...register("password")} className="w-full p-2 border rounded-md" />
      </FormInput>

      {/* Input Confirm Password */}
      <FormInput label="Confirm Password" error={errors.confirmPassword?.message}>
        <input type="password" {...register("confirmPassword")} className="w-full p-2 border rounded-md" />
      </FormInput>

      {/* Select Country */}
      <FormInput label="Country" error={errors.country?.message}>
        <Controller name="country" control={control} render={({ field }) => <Select {...field} options={countryOptions} value={field.value || undefined} onChange={(selected) => field.onChange(selected)} className="w-full" />} />
      </FormInput>

      {/* Checkbox Terms & Conditions */}
      <div className="flex items-center">
        <input type="checkbox" {...register("terms")} className="mr-2" />
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
