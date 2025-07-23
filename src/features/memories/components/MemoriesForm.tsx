import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memorySchema } from '@/features/memories/validators/memorySchema';
import type { MemoryInput } from '@/features/memories/validators/memorySchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  defaultValues?: MemoryInput;
  onSubmit: (data: MemoryInput) => void;
};

export const MemoryForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemoryInput>({
    resolver: zodResolver(memorySchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('title')} placeholder="Title" />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <Input {...register('description')} placeholder="Description" />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}

      <Button type="submit">Submit</Button>
    </form>
  );
};
