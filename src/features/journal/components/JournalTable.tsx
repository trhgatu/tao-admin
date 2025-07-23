import type { IJournal } from '@/types';
import { Table, Tag, Button, Space, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  journals: IJournal[];
  onView?: (journal: IJournal) => void;
  onEdit?: (journal: IJournal) => void;
  onDelete?: (journal: IJournal) => void;
}

export const JournalTable = ({ journals, onView, onEdit, onDelete }: Props) => {
  const columns: ColumnsType<IJournal> = [
    {
      title: 'Content',
      dataIndex: 'rawContent',
      key: 'rawContent',
      render: (text: string) => (
        <span title={text}>
          {text.length > 48 ? text.slice(0, 48) + '...' : text}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'public'
              ? 'green'
              : status === 'private'
                ? 'orange'
                : 'default'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Auto',
      dataIndex: 'autoTranslated',
      key: 'autoTranslated',
      render: (val: boolean) =>
        val ? <Tag color="blue">Auto</Tag> : <Tag color="default">No</Tag>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Deleted',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (val: boolean) =>
        val ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>,
    },

    // Cột Actions với các nút View, Edit, Delete
    {
      title: 'Actions',
      key: 'actions',
      width: 130,
      render: (_unused, record: IJournal) => (
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            onClick={() => onView?.(record)}
            type="link"
            title="Xem chi tiết"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit?.(record)}
            type="link"
            title="Chỉnh sửa"
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa bản ghi này?"
            onConfirm={() => onDelete?.(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} danger type="link" title="Xóa" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<IJournal>
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={journals}
      pagination={false}
      bordered
    />
  );
};
