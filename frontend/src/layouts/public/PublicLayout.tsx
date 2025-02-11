import PublicRoutes from "src/routes/public/PublicRoutes";

const PublicLayout = () => {
  return (
    <div className="relative flex justify-center overflow-x-hidden w-full">
      <PublicRoutes />
    </div>
  );
};

export default PublicLayout;
