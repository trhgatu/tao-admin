import type { IMemory } from '@/types';
import {
  Table,
  Tag,
  Button,
  Space,
  Popconfirm,
  Image,
  Tooltip,
  Avatar,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  memories: IMemory[];
  onView?: (memory: IMemory) => void;
  onEdit?: (memory: IMemory) => void;
  onDelete?: (memory: IMemory) => void;
}

export const MemoriesTable = ({
  memories,
  onView,
  onEdit,
  onDelete,
}: Props) => {
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

  const columns: ColumnsType<IMemory> = [
    {
      title: 'Kỉ niệm',
      key: 'memory',
      width: 300,
      render: (_unused, record: IMemory) => (
        <div className="flex gap-3">
          {/* Thumbnail Image */}
          <div className="flex-shrink-0">
            {record.imageUrl ? (
              <Image
                src={record.imageUrl}
                alt={record.title}
                width={60}
                height={60}
                className="rounded-lg object-cover"
                placeholder={
                  <div className="w-[60px] h-[60px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <UserOutlined className="text-gray-400" />
                  </div>
                }
              />
            ) : (
              <Avatar
                size={60}
                icon={<UserOutlined />}
                className="rounded-lg bg-gray-200"
              />
            )}
          </div>

          {/* Title & Description */}
          <div className="flex-1 min-w-0">
            <div
              className="font-semibold text-gray-900 truncate"
              title={record.title}
            >
              {record.title}
            </div>
            <div
              className="text-sm text-gray-500 line-clamp-2 mt-1"
              title={record.description}
            >
              {record.description
                ? record.description.length > 80
                  ? `${record.description.slice(0, 80)}...`
                  : record.description
                : 'No description'}
            </div>
            {record.slug && (
              <code className="text-xs text-gray-400 mt-1 block">
                {record.slug}
              </code>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Chi tiết',
      key: 'details',
      width: 200,
      render: (_unused, record: IMemory) => (
        <div className="space-y-2">
          {/* Location */}
          {record.location && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <EnvironmentOutlined className="text-gray-400" />
              <span className="truncate" title={record.location}>
                {record.location.length > 20
                  ? `${record.location.slice(0, 20)}...`
                  : record.location}
              </span>
            </div>
          )}

          {/* Date */}
          {record.date && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <CalendarOutlined className="text-gray-400" />
              <span>{new Date(record.date).toLocaleDateString()}</span>
            </div>
          )}

          {/* Mood */}
          {record.mood && (
            <div className="flex items-center gap-1 text-sm">
              <span>{getMoodEmoji(record.mood)}</span>
              <span className="capitalize text-gray-600">{record.mood}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Thẻ',
      dataIndex: 'tags',
      key: 'tags',
      width: 180,
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-1">
          {tags && tags.length > 0 ? (
            tags.slice(0, 3).map((tag, index) => (
              <Tag key={index} color="blue" className="text-xs">
                {tag}
              </Tag>
            ))
          ) : (
            <span className="text-gray-400 text-sm">No tags</span>
          )}
          {tags && tags.length > 3 && (
            <Tooltip title={tags.slice(3).join(', ')}>
              <Tag color="default" className="text-xs cursor-help">
                +{tags.length - 3}
              </Tag>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag
          color={
            status === 'public'
              ? 'green'
              : status === 'private'
                ? 'orange'
                : status === 'draft'
                  ? 'default'
                  : 'default'
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Tạo vào',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => (
        <div className="text-sm text-gray-600">
          {new Date(date).toLocaleDateString()}
        </div>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_unused, record: IMemory) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => onView?.(record)}
              type="text"
              size="small"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit?.(record)}
              type="text"
              size="small"
            />
          </Tooltip>
          <Popconfirm
            title="Delete Memory"
            description="Are you sure you want to delete this memory?"
            onConfirm={() => onDelete?.(record)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete">
              <Button
                icon={<DeleteOutlined />}
                type="text"
                danger
                size="small"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<IMemory>
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={memories}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} memories`,
      }}
      scroll={{ x: 1200 }}
      size="middle"
      className="memories-table"
    />
  );
};
