import { SidebarTrigger } from '@/components/ui/sidebar';
import { Header } from '@/components/layout/Header';

export const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 min-h-screen">
      <div className="flex items-center justify-between">
        <SidebarTrigger />
        <Header />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white shadow-md rounded-xl aspect-video flex items-center justify-center text-gray-400 font-semibold">
          Card 1
        </div>
        <div className="bg-white shadow-md rounded-xl aspect-video flex items-center justify-center text-gray-400 font-semibold">
          Card 2
        </div>
        <div className="bg-white shadow-md rounded-xl aspect-video flex items-center justify-center text-gray-400 font-semibold">
          Card 3
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl flex-1 p-6 min-h-[60vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Main Content</h2>
        <p className="text-gray-600">
          Đây là vùng dành cho dashboard chính, có thể chứa biểu đồ, bảng dữ
          liệu, thống kê, ...
        </p>
      </div>
    </div>
  );
};
