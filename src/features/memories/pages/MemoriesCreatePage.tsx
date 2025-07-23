import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Typography, Space, Divider } from 'antd';
import { MemoryForm } from '../components';
import { createMemory } from '../services/memoriesService';
import type { MemoryInput } from '../validators/memorySchema';

const { Title, Text } = Typography;

export const MemoryCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: MemoryInput) => {
    try {
      await createMemory(data);
      navigate('/memories');
    } catch (error) {
      console.error('Failed to create memory:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/memories');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
          <Space className="mb-4">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
              type="text"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              Back to Memories
            </Button>
          </Space>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <PlusOutlined className="text-white text-lg" />
            </div>
            <Title level={2} className="m-0 text-gray-900">
              Create New Memory
            </Title>
          </div>

          <Text className="text-gray-600 text-base">
            Add a new memory to your collection. Fill in the details below to
            get started.
          </Text>
        </div>

        <Divider className="mb-8" />

        {/* Form Section */}
        <Card className="shadow-sm border-0" bodyStyle={{ padding: '32px' }}>
          <MemoryForm onSubmit={handleSubmit} />
        </Card>

        {/* Footer Actions (Optional) */}
        <div className="mt-6 flex justify-end">
          <Button onClick={handleGoBack} className="mr-3">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
