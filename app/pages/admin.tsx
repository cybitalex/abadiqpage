import React from "react";
import { useRouter } from "next/router";

const AdminPage: React.FC = () => {
  const router = useRouter();

  const handleAdminButtonClick = () => {
    // Use Next.js Router to navigate to the admin portal
    router.push("/admin");
  };

  return (
    <div>
      <h1>Admin Portal</h1>
      <button onClick={handleAdminButtonClick}>Go to Admin Portal</button>
    </div>
  );
};

export default AdminPage;
