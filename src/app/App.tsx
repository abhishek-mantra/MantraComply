import { RouterProvider } from "react-router";
import { Suspense } from "react";
import { router } from "./routes";

export default function App() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2196F3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <RouterProvider router={router} />
    </Suspense>
  );
}