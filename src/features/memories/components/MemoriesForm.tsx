import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memorySchema } from '@/features/memories/validators/memorySchema';
import type { MemoryInput } from '@/features/memories/validators/memorySchema';
import { uploadMemoryImage } from '../services/memoriesService';
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
  Upload,
  message,
  Spin,
  Progress,
} from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TagsOutlined,
  SmileOutlined,
  InboxOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import type { UploadProps } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

type Props = {
  defaultValues?: MemoryInput;
  onSubmit: (data: MemoryInput) => void;
};

export const MemoryForm = ({ defaultValues, onSubmit }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<MemoryInput>({
    resolver: zodResolver(memorySchema),
    defaultValues: {
      status: 'public',
      tags: [],
      ...defaultValues,
    },
  });

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Bạn chỉ có thể tải lên tệp hình ảnh!');
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Hình ảnh phải nhỏ hơn 5MB!');
        return false;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      return false;
    },
  };

  const handleFormSubmit = async (data: MemoryInput) => {
    let finalImageUrl = '';
    if (selectedFile) {
      setUploading(true);
      setUploadProgress(0);

      try {
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        finalImageUrl = await uploadMemoryImage(selectedFile, 'memories');

        clearInterval(progressInterval);
        setUploadProgress(100);

        message.success('Tải hình ảnh lên thành công!');
      } catch {
        message.error('Tải hình ảnh lên thất bại. Vui lòng thử lại.');
        setUploading(false);
        setUploadProgress(0);
        return;
      }

      setUploading(false);
    }

    onSubmit({
      ...data,
      imageUrl: finalImageUrl,
    });
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setValue('imageUrl', '');
    setUploadProgress(0);
  };

  const isFormDisabled = uploading || isSubmitting;

  return (
    <div className="max-w-4xl mx-auto">
      <form
        className="ant-form ant-form-vertical"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Card
          title={
            <Title level={4} className="mb-0">
              📝 Thông tin cơ bản
            </Title>
          }
          className="mb-6"
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Tiêu đề"
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
                      placeholder="Nhập tiêu đề kỷ niệm..."
                      size="large"
                      disabled={isFormDisabled}
                    />
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Mô tả"
                validateStatus={errors.description ? 'error' : ''}
                help={errors.description?.message}
              >
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Mô tả kỷ niệm của bạn một cách chi tiết..."
                      rows={4}
                      size="large"
                      disabled={isFormDisabled}
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
              🎯 Chi tiết
            </Title>
          }
          className="mb-6"
        >
          {/* Image Upload Section */}
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Hình ảnh kỷ niệm"
                help="Chọn một hình ảnh để đại diện cho kỷ niệm này (Tối đa 5MB, JPG/PNG). Hình ảnh sẽ được tải lên khi bạn tạo kỷ niệm."
              >
                {!selectedFile ? (
                  <Dragger
                    {...uploadProps}
                    className="upload-area"
                    disabled={isFormDisabled}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined
                        style={{ fontSize: '48px', color: '#1890ff' }}
                      />
                    </p>
                    <p className="ant-upload-text">
                      Nhấp hoặc kéo hình ảnh vào khu vực này để chọn
                    </p>
                    <p className="ant-upload-hint">
                      Hình ảnh sẽ được tải lên khi bạn tạo kỷ niệm. Hỗ trợ các
                      tệp JPG, PNG. Kích thước tối đa 5MB.
                    </p>
                  </Dragger>
                ) : (
                  <div className="uploaded-image-container">
                    <div className="image-preview-wrapper">
                      <img
                        src={previewUrl}
                        alt="Xem trước kỷ niệm"
                        className="uploaded-image-preview"
                      />

                      {/* Upload progress overlay */}
                      {uploading && (
                        <div className="upload-loading-overlay">
                          <div className="upload-progress-content">
                            <Spin
                              indicator={
                                <LoadingOutlined
                                  style={{ fontSize: 24 }}
                                  spin
                                />
                              }
                            />
                            <p className="upload-loading-text">
                              Đang tải hình ảnh lên...
                            </p>
                            <Progress
                              percent={uploadProgress}
                              size="small"
                              status={
                                uploadProgress === 100 ? 'success' : 'active'
                              }
                              className="upload-progress-bar"
                            />
                          </div>
                        </div>
                      )}

                      {!uploading && (
                        <div className="image-overlay">
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={handleRemoveImage}
                            className="change-image-btn"
                          >
                            Đổi hình ảnh
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="file-info mt-2">
                      <p className="text-sm text-gray-600">
                        Đã chọn: {selectedFile.name} (
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Ngày"
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
                      placeholder="Chọn ngày"
                      size="large"
                      className="w-full"
                      suffixIcon={<CalendarOutlined />}
                      disabled={isFormDisabled}
                    />
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Địa điểm"
                validateStatus={errors.location ? 'error' : ''}
                help={errors.location?.message}
              >
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Điều này xảy ra ở đâu?"
                      size="large"
                      prefix={<EnvironmentOutlined />}
                      disabled={isFormDisabled}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tâm trạng"
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
                      placeholder="Chọn tâm trạng của bạn"
                      size="large"
                      suffixIcon={<SmileOutlined />}
                      disabled={isFormDisabled}
                    >
                      <Option value="happy">😊 Vui vẻ</Option>
                      <Option value="peaceful">😌 Bình yên</Option>
                      <Option value="excited">🤩 Hưng phấn</Option>
                      <Option value="nostalgic">🥺 Hoài niệm</Option>
                      <Option value="grateful">🙏 Biết ơn</Option>
                      <Option value="reflective">🤔 Suy ngẫm</Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Trạng thái"
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
                      disabled={isFormDisabled}
                    >
                      <Option value="public">🌍 Công khai</Option>
                      <Option value="private">🔒 Riêng tư</Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Thẻ"
                validateStatus={errors.tags ? 'error' : ''}
                help={errors.tags?.message || 'Nhập và nhấn Enter để thêm thẻ'}
              >
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="tags"
                      size="large"
                      placeholder="thiền định, bình yên, buổi sáng..."
                      tokenSeparators={[',', ' ']}
                      style={{ width: '100%' }}
                      dropdownStyle={{ display: 'none' }}
                      suffixIcon={<TagsOutlined />}
                      disabled={isFormDisabled}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card className="text-center">
          <Space size="large">
            <Button
              size="large"
              onClick={() => window.history.back()}
              disabled={isFormDisabled}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting || uploading}
              size="large"
              className="min-w-[140px]"
              disabled={isFormDisabled}
            >
              {uploading
                ? 'Đang tải lên...'
                : isSubmitting
                  ? 'Đang tạo...'
                  : 'Tạo kỷ niệm'}
            </Button>
          </Space>
        </Card>
      </form>
    </div>
  );
};
