import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Space,
  Tag,
  Image,
  Typography,
  Row,
  Col,
  Spin,
  Alert,
  Tooltip,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TagsOutlined,
  ShareAltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getMemoryById } from '../services/memoriesService';
import type { IMemory } from '@/types';

const { Title, Paragraph, Text } = Typography;

export const MemoriesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [memory, setMemory] = useState<IMemory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load memory data
  useEffect(() => {
    const loadMemory = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const data = await getMemoryById(id);
        setMemory(data);
      } catch (err) {
        setError('Không thể tải chi tiết kỷ niệm');
        console.error('Lỗi tải kỷ niệm:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMemory();
  }, [id]);

  // Mood emoji mapping
  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      happy: '😊',
      peaceful: '😌',
      excited: '🤩',
      nostalgic: '🥺',
      grateful: '🙏',
      reflective: '🤔',
    };
    return moodMap[mood] || '😐';
  };

  // Handle actions
  const handleEdit = () => {
    navigate(`/memories/${id}/edit`);
  };

  const handleGoBack = () => {
    navigate('/memories');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  // Error state
  if (error || !memory) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
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
        {/* Header Actions */}
        <div className="mb-8">
          <Space className="mb-4">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
              type="text"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              Quay lại Kỷ niệm
            </Button>
          </Space>

          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Title level={1} className="mb-2 text-gray-900">
                {memory.title}
              </Title>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>
                  Tạo vào{' '}
                  {new Date(memory.createdAt).toLocaleDateString('vi-VN')}
                </span>
                {memory.slug && (
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {memory.slug}
                  </code>
                )}
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
          {/* Main Content */}
          <Col xs={24} lg={16}>
            {/* Image */}
            {memory.imageUrl && (
              <Card className="mb-6 overflow-hidden">
                <Image
                  src={memory.imageUrl}
                  alt={memory.title}
                  className="w-full rounded-lg"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  placeholder={
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <UserOutlined className="text-4xl text-gray-400" />
                    </div>
                  }
                />
              </Card>
            )}

            {/* Description */}
            <Card title="Mô tả" className="mb-6">
              {memory.description ? (
                <Paragraph className="text-base leading-relaxed whitespace-pre-wrap">
                  {memory.description}
                </Paragraph>
              ) : (
                <Text type="secondary" italic>
                  Không có mô tả nào được cung cấp
                </Text>
              )}
            </Card>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            {/* Status & Basic Info */}
            <Card title="Chi tiết Kỷ niệm" className="mb-6">
              <div className="space-y-4">
                <div>
                  <Text strong>Trạng thái:</Text>
                  <div className="mt-1">
                    <Tag
                      color={
                        memory.status === 'public'
                          ? 'green'
                          : memory.status === 'private'
                            ? 'orange'
                            : 'default'
                      }
                      className="text-sm"
                    >
                      {memory.status === 'public'
                        ? 'CÔNG KHAI'
                        : memory.status === 'private'
                          ? 'RIÊNG TƯ'
                          : 'KHÔNG XÁC ĐỊNH'}
                    </Tag>
                  </div>
                </div>

                {memory.date && (
                  <div>
                    <Text strong>
                      <CalendarOutlined className="mr-2" />
                      Ngày kỷ niệm:
                    </Text>
                    <div className="mt-1 text-gray-600">
                      {new Date(memory.date).toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                )}

                {memory.location && (
                  <div>
                    <Text strong>
                      <EnvironmentOutlined className="mr-2" />
                      Địa điểm:
                    </Text>
                    <div className="mt-1 text-gray-600">{memory.location}</div>
                  </div>
                )}

                {memory.mood && (
                  <div>
                    <Text strong>Tâm trạng:</Text>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xl">
                        {getMoodEmoji(memory.mood)}
                      </span>
                      <span className="capitalize text-gray-600">
                        {memory.mood === 'happy'
                          ? 'vui vẻ'
                          : memory.mood === 'peaceful'
                            ? 'bình yên'
                            : memory.mood === 'excited'
                              ? 'hưng phấn'
                              : memory.mood === 'nostalgic'
                                ? 'hoài niệm'
                                : memory.mood === 'grateful'
                                  ? 'biết ơn'
                                  : memory.mood === 'reflective'
                                    ? 'suy ngẫm'
                                    : memory.mood}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Tags */}
            {memory.tags && memory.tags.length > 0 && (
              <Card
                title={
                  <span>
                    <TagsOutlined className="mr-2" />
                    Thẻ
                  </span>
                }
                className="mb-6"
              >
                <div className="flex flex-wrap gap-2">
                  {memory.tags.map((tag, index) => (
                    <Tag key={index} color="blue" className="mb-1">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Card>
            )}

            {/* Metadata */}
            <Card title="Siêu dữ liệu" size="small">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <Text type="secondary">Tạo vào:</Text>
                  <Text>
                    {new Date(memory.createdAt).toLocaleDateString('vi-VN')}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">Cập nhật:</Text>
                  <Text>
                    {new Date(memory.updatedAt).toLocaleDateString('vi-VN')}
                  </Text>
                </div>
                {memory.autoTranslated !== undefined && (
                  <div className="flex justify-between">
                    <Text type="secondary">Tự động dịch:</Text>
                    <Tag color={memory.autoTranslated ? 'blue' : 'default'}>
                      {memory.autoTranslated ? 'Có' : 'Không'}
                    </Tag>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
