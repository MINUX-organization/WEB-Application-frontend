import { createFlightSheetWithCustomMiner } from "@/shared/api/createFlightSheetWithCustomMiner";
import { FButton, FTextInput } from "@/shared/ui";
import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

type TCreateFlightSheetWithCustomMinerData = Parameters<typeof createFlightSheetWithCustomMiner>[0]

type TCreateFlightSheetWithCustomMinerProps = {
  onAdd: () => void;
};

export function CreateFlightSheetWithCustomMiner({
  onAdd,
}: TCreateFlightSheetWithCustomMinerProps) {
  const [form] = Form.useForm();

  const handleSubmit = (data: TCreateFlightSheetWithCustomMinerData) => {
    createFlightSheetWithCustomMiner(data)
    .then(() => {
      onAdd()
    })
    .catch((error) => {
      console.log(error);
      toast(error.message, { type: 'error' })
    })
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={30}>
          <Col xs={12}>
            <Form.Item
              initialValue={""}
              label={<div className="text-2xl">Name</div>}
              name="name"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="Write flight sheet's name..."
                inputProps={{ className: "text-2xl" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              initialValue={""}
              label={<div className="text-2xl">Installation URL</div>}
              name="installationURI"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="https://..."
                inputProps={{ className: "text-2xl" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              initialValue={""}
              label={<div className="text-2xl">Wallet</div>}
              name="wallet"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="Write wallet address..."
                inputProps={{ className: "text-2xl" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              initialValue={""}
              label={<div className="text-2xl">Pool URL</div>}
              name="pool"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="Write pool URL..."
                inputProps={{ className: "text-2xl" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              initialValue={""}
              label={<div className="text-2xl">Coin</div>}
              name="coin"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="Write coin..."
                inputProps={{ className: "text-2xl" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              initialValue={""}
              label={<div className="text-2xl">Algorithm</div>}
              name="algorithm"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="Write algorithm..."
                inputProps={{ className: "text-2xl" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              initialValue={""}
              label={<div className="text-2xl">Pool template</div>}
              name="poolTemplate"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="Write pool template..."
                inputProps={{ className: "text-2xl" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              initialValue={""}
              label={<div className="text-2xl">Wallet and worker template</div>}
              name="walletAndWorkerTemplate"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="Write wallet and worker template..."
                inputProps={{ className: "text-2xl" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              initialValue={""}
              label={<div className="text-2xl">Extra config arguments</div>}
              name="extraConfigArguments"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="Write extra config arguments..."
                inputProps={{ className: "text-2xl" }}
                textareaProps={{ className: "text-2xl" }}
                multiline
              />
            </Form.Item>
          </Col>
          <Col xs={24} className="mt-10">
            <div className="float-right flex gap-20">
              <FButton
                severity="bad"
                type="submit"
                className="float-right"
                onClick={() => handleReset()}
              >
                Reset
              </FButton>
              <FButton severity="good" type="submit" className="float-right">
                Create flight sheet with custom miner
              </FButton>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
