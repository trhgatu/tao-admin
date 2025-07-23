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
  DeleteOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TagsOutlined,
  ShareAltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getMemoryById, deleteMemory } from '../services/memoriesService';
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
        setError('Failed to load memory details');
        console.error('Load memory error:', err);
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

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteMemory(id);
      navigate('/memories');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleGoBack = () => {
    navigate('/memories');
  };

  // Loading state
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
            message="Error"
            description={error || 'Memory not found'}
            type="error"
            showIcon
            action={<Button onClick={handleGoBack}>Back to Memories</Button>}
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
              Back to Memories
            </Button>
          </Space>

          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Title level={1} className="mb-2 text-gray-900">
                {memory.title}
              </Title>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>
                  Created on {new Date(memory.createdAt).toLocaleDateString()}
                </span>
                {memory.slug && (
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {memory.slug}
                  </code>
                )}
              </div>
            </div>

            <Space>
              <Tooltip title="Share">
                <Button icon={<ShareAltOutlined />} />
              </Tooltip>
              <Button
                icon={<EditOutlined />}
                onClick={handleEdit}
                type="primary"
              >
                Edit
              </Button>
              <Button icon={<DeleteOutlined />} onClick={handleDelete} danger>
                Delete
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
            <Card title="Description" className="mb-6">
              {memory.description ? (
                <Paragraph className="text-base leading-relaxed whitespace-pre-wrap">
                  {memory.description}
                </Paragraph>
              ) : (
                <Text type="secondary" italic>
                  No description provided
                </Text>
              )}
            </Card>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            {/* Status & Basic Info */}
            <Card title="Memory Details" className="mb-6">
              <div className="space-y-4">
                <div>
                  <Text strong>Status:</Text>
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
                      {memory.status?.toUpperCase() || 'UNKNOWN'}
                    </Tag>
                  </div>
                </div>

                {memory.date && (
                  <div>
                    <Text strong>
                      <CalendarOutlined className="mr-2" />
                      Memory Date:
                    </Text>
                    <div className="mt-1 text-gray-600">
                      {new Date(memory.date).toLocaleDateString('en-US', {
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
                      Location:
                    </Text>
                    <div className="mt-1 text-gray-600">{memory.location}</div>
                  </div>
                )}

                {memory.mood && (
                  <div>
                    <Text strong>Mood:</Text>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xl">
                        {getMoodEmoji(memory.mood)}
                      </span>
                      <span className="capitalize text-gray-600">
                        {memory.mood}
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
                    Tags
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
            <Card title="Metadata" size="small">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <Text type="secondary">Created:</Text>
                  <Text>{new Date(memory.createdAt).toLocaleDateString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">Updated:</Text>
                  <Text>{new Date(memory.updatedAt).toLocaleDateString()}</Text>
                </div>
                {memory.autoTranslated !== undefined && (
                  <div className="flex justify-between">
                    <Text type="secondary">Auto Translated:</Text>
                    <Tag color={memory.autoTranslated ? 'blue' : 'default'}>
                      {memory.autoTranslated ? 'Yes' : 'No'}
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
