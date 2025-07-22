import type { IMemory } from '@/types';

interface Props {
  memories: IMemory[];
}

export const MemoriesTable = ({ memories }: Props) => {
  return (
    <table className="w-full text-left border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Title</th>
          <th className="p-2">Slug</th>
          <th className="p-2">Status</th>
          <th className="p-2">Date</th>
          <th className="p-2">Created</th>
        </tr>
      </thead>
      <tbody>
        {memories.map((memory) => (
          <tr key={memory._id} className="border-t">
            <td className="p-2">{memory.title}</td>
            <td className="p-2">{memory.slug}</td>
            <td className="p-2">{memory.status}</td>
            <td className="p-2">{memory.date}</td>
            <td className="p-2">{memory.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
