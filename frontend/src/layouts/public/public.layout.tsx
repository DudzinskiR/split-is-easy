import PublicRoutes from "src/routes/public/public.route";

const PublicLayout = () => {
  return (
    <div className="relative flex justify-center overflow-x-hidden w-full">
      <PublicRoutes />
    </div>
  );
};

export default PublicLayout;
