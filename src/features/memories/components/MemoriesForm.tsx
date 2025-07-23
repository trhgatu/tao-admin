import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memorySchema } from '@/features/memories/validators/memorySchema';
import type { MemoryInput } from '@/features/memories/validators/memorySchema';
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  DatePicker,
  Row,
  Col,
  Space,
  Typography,
} from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TagsOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

type Props = {
  defaultValues?: MemoryInput;
  onSubmit: (data: MemoryInput) => void;
};

export const MemoryForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MemoryInput>({
    resolver: zodResolver(memorySchema),
    defaultValues: {
      status: 'public',
      tags: [],
      ...defaultValues,
    },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <form
        className="ant-form ant-form-vertical"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Basic Information Card */}
        <Card
          title={
            <Title level={4} className="mb-0">
              📝 Basic Information
            </Title>
          }
          className="mb-6"
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Title"
                required
                validateStatus={errors.title ? 'error' : ''}
                help={errors.title?.message}
              >
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter memory title..."
                      size="large"
                    />
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Description"
                required
                validateStatus={errors.description ? 'error' : ''}
                help={errors.description?.message}
              >
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Describe your memory in detail..."
                      rows={4}
                      size="large"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Details Card */}
        <Card
          title={
            <Title level={4} className="mb-0">
              🎯 Details
            </Title>
          }
          className="mb-6"
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Date"
                validateStatus={errors.date ? 'error' : ''}
                help={errors.date?.message}
              >
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) =>
                        field.onChange(date?.format('YYYY-MM-DD'))
                      }
                      placeholder="Select date"
                      size="large"
                      className="w-full"
                      suffixIcon={<CalendarOutlined />}
                    />
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Location"
                validateStatus={errors.location ? 'error' : ''}
                help={errors.location?.message}
              >
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Where did this happen?"
                      size="large"
                      prefix={<EnvironmentOutlined />}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Image URL"
                validateStatus={errors.imageUrl ? 'error' : ''}
                help={errors.imageUrl?.message}
              >
                <Controller
                  name="imageUrl"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="https://example.com/image.jpg"
                      size="large"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Mood"
                validateStatus={errors.mood ? 'error' : ''}
                help={errors.mood?.message}
              >
                <Controller
                  name="mood"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      placeholder="Select your mood"
                      size="large"
                      suffixIcon={<SmileOutlined />}
                    >
                      <Option value="happy">😊 Happy</Option>
                      <Option value="peaceful">😌 Peaceful</Option>
                      <Option value="excited">🤩 Excited</Option>
                      <Option value="nostalgic">🥺 Nostalgic</Option>
                      <Option value="grateful">🙏 Grateful</Option>
                      <Option value="reflective">🤔 Reflective</Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Status"
                validateStatus={errors.status ? 'error' : ''}
                help={errors.status?.message}
              >
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      size="large"
                      defaultValue="public"
                    >
                      <Option value="public">🌍 Public</Option>
                      <Option value="private">🔒 Private</Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Tags"
                validateStatus={errors.tags ? 'error' : ''}
                help={errors.tags?.message || 'Separate tags with commas'}
              >
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Input
                      value={
                        Array.isArray(field.value) ? field.value.join(', ') : ''
                      }
                      onChange={(e) => {
                        const tagsArray = e.target.value
                          .split(',')
                          .map((tag) => tag.trim())
                          .filter((tag) => tag.length > 0);
                        field.onChange(tagsArray);
                      }}
                      placeholder="meditation, peace, morning (comma separated)"
                      size="large"
                      prefix={<TagsOutlined />}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Submit Actions */}
        <Card className="text-center">
          <Space size="large">
            <Button size="large" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              size="large"
              className="min-w-[140px]"
            >
              {isSubmitting ? 'Creating...' : 'Create Memory'}
            </Button>
          </Space>
        </Card>
      </form>
    </div>
  );
};
