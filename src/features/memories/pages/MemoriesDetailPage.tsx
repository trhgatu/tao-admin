import { useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Spin,
  Alert,
  Button,
  Typography,
  Space,
  Tooltip,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { getMemoryById } from '../services/memoriesService';
import { MemoryImageCard } from '../components/MemoryImageCard';
import { MemoryDescription } from '../components/MemoryDescription';
import { MemorySidebar } from '../components/MemorySidebar';
import type { IMemory } from '@/types';

const { Title } = Typography;

export const MemoriesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [memory, setMemory] = useState<IMemory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getMemoryById(id)
      .then(setMemory)
      .catch(() => setError('Không thể tải chi tiết kỷ niệm'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEdit = () => navigate(`/memories/${id}/edit`);
  const handleGoBack = () => navigate('/memories');

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );

  if (error || !memory) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Alert
            message="Lỗi"
            description={error || 'Không tìm thấy kỷ niệm'}
            type="error"
            showIcon
            action={<Button onClick={handleGoBack}>Quay lại Kỷ niệm</Button>}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <Space className="mb-4">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
              type="text"
            >
              Quay lại Kỷ niệm
            </Button>
          </Space>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Title level={1}>{memory.title}</Title>
              <div className="text-sm text-gray-500">
                Tạo vào {new Date(memory.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <Space>
              <Tooltip title="Chia sẻ">
                <Button icon={<ShareAltOutlined />} />
              </Tooltip>
              <Button
                icon={<EditOutlined />}
                onClick={handleEdit}
                type="primary"
              >
                Chỉnh sửa
              </Button>
            </Space>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <MemoryImageCard imageUrl={memory.imageUrl} title={memory.title} />
            <MemoryDescription description={memory.description} />
          </Col>
          <Col xs={24} lg={8}>
            <MemorySidebar memory={memory} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
