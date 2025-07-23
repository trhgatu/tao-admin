import type { IQuote } from '@/types/quote';
import { Table, Tag, Button, Space, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  quotes: IQuote[];
  onView?: (quote: IQuote) => void;
  onEdit?: (quote: IQuote) => void;
  onDelete?: (quote: IQuote) => void;
}

export const QuoteTable = ({ quotes, onView, onEdit, onDelete }: Props) => {
  const columns: ColumnsType<IQuote> = [
    {
      title: 'Quote',
      dataIndex: 'text',
      key: 'text',
      render: (text: string) => (
        <span title={text}>
          {text.length > 70 ? `${text.slice(0, 70)}...` : text}
        </span>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) =>
        tags.map((tag) => (
          <Tag key={tag} color="blue" style={{ marginBottom: 4 }}>
            {tag}
          </Tag>
        )),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'public' ? 'green' : 'default'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Auto Translated',
      dataIndex: 'autoTranslated',
      key: 'autoTranslated',
      render: (val: boolean) =>
        val ? <Tag color="blue">Yes</Tag> : <Tag>No</Tag>,
    },
    {
      title: 'Deleted',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (val: boolean) =>
        val ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: string, record: IQuote) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => onView?.(record)}
            title="Xem chi tiết"
            type="link"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit?.(record)}
            title="Chỉnh sửa"
            type="link"
          />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa quote này?"
            onConfirm={() => onDelete?.(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} title="Xóa" danger type="link" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<IQuote>
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={quotes}
      pagination={false}
      bordered
    />
  );
};
