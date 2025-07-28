import { Card, Tag, Typography } from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import type { IMemory } from '@/types';
import { getMoodEmoji } from '../utils';

const { Text } = Typography;

export const MemorySidebar = ({ memory }: { memory: IMemory }) => {
  return (
    <>
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
                <span className="text-xl">{getMoodEmoji(memory.mood)}</span>
                <span className="capitalize text-gray-600">{memory.mood}</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {memory.tags?.length > 0 && (
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
    </>
  );
};
