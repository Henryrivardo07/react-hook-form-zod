// Halaman utama yang akan menampilkan form registrasi
import RegistrationForm from "../components/RegistrationForm";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">User Registration</h2>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Home;
