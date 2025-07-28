import { Card, Typography } from 'antd';

const { Paragraph, Text } = Typography;

export const MemoryDescription = ({
  description,
}: {
  description?: string;
}) => (
  <Card title="Mô tả" className="mb-6">
    {description ? (
      <Paragraph className="text-base leading-relaxed whitespace-pre-wrap">
        {description}
      </Paragraph>
    ) : (
      <Text type="secondary" italic>
        Không có mô tả nào được cung cấp
      </Text>
    )}
  </Card>
);
