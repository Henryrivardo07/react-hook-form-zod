// Komponen reusable untuk mengelola input form beserta label dan error message.
import React from "react";

// Mendefinisikan tipe props yang akan diterima oleh FormInput
interface FormInputProps {
  label: string; // Label untuk input
  error?: string; // Pesan error jika ada
  children: React.ReactNode; // Elemen input yang akan dimasukkan
}

const FormInput: React.FC<FormInputProps> = ({ label, error, children }) => (
  <div>
    {/* Label input */}
    <label className="block text-sm font-medium">{label}</label>
    {/* Input yang dimasukkan sebagai children */}
    {children}
    {/* Pesan error akan ditampilkan jika ada kesalahan validasi */}
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

export default FormInput;
