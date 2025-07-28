import { Card, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Props {
  imageUrl?: string;
  title: string;
}

export const MemoryImageCard = ({ imageUrl, title }: Props) => {
  if (!imageUrl) return null;

  return (
    <Card className="mb-6 overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full rounded-lg"
        style={{ maxHeight: '400px', objectFit: 'cover' }}
        placeholder={
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <UserOutlined className="text-4xl text-gray-400" />
          </div>
        }
      />
    </Card>
  );
};
