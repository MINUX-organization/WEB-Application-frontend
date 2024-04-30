import { createFlightSheetWithCustomMiner } from "@/shared/api";
import { editFlightSheetWithCustomMiner } from "@/shared/api";
import { TFlightSheetFilled } from "@/shared/types";
import { FButton, FTextInput } from "@/shared/ui";
import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

type TFlightSheetWithCustomMinerFormData = Parameters<typeof createFlightSheetWithCustomMiner>[0]

type TFlightSheetWithCustomMinerFormProps = {
  flightSheet?: Extract<TFlightSheetFilled, { type: 'CUSTOM' }>
  onSubmit: () => void;
};

export function FlightSheetWithCustomMinerForm({
  flightSheet,
  onSubmit,
}: TFlightSheetWithCustomMinerFormProps) {
  const handleSubmit = (data: TFlightSheetWithCustomMinerFormData) => {
    if (flightSheet) {
      editFlightSheetWithCustomMiner({
        id: flightSheet.id,
        newName: data.name,
        newAlgorithm: data.algorithm,
        newCoin: data.coin,
        newExtraConfigArguments: data.extraConfigArguments,
        newInstallationURL: data.installationURL,
        newPoolTemplate: data.poolTemplate,
        newPoolURL: data.poolURL,
        newWallet: data.wallet,
        newWalletAndWorkerTemplate: data.walletAndWorkerTemplate
      })
      .then(() => {
        onSubmit()
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      })
    } else {
      createFlightSheetWithCustomMiner(data)
      .then(() => {
        onSubmit()
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, { type: 'error' })
      })
    }
  };

  return (
    <div>
      <Form onFinish={handleSubmit} layout="vertical">
        <Row gutter={30}>
          <Col xs={12}>
            <Form.Item
              initialValue={flightSheet?.name ?? ""}
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
              initialValue={flightSheet?.installationURL ?? ""}
              label={<div className="text-2xl">Installation URL</div>}
              name="installationURL"
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
              initialValue={flightSheet?.wallet ?? ""}
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
              initialValue={flightSheet?.poolURL ?? ""}
              label={<div className="text-2xl">Pool URL</div>}
              name="poolURL"
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
              initialValue={flightSheet?.coin ?? ""}
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
              initialValue={flightSheet?.algorithm ?? ""}
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
              initialValue={flightSheet?.poolTemplate ?? ""}
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
              initialValue={flightSheet?.walletAndWorkerTemplate ?? ""}
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
              initialValue={flightSheet?.extraConfigArguments ?? ""}
              label={<div className="text-2xl">Extra config arguments</div>}
              name="extraConfigArguments"
              rules={[{ required: true }]}
            >
              <FTextInput
                placeholder="Write extra config arguments..."
                inputProps={{ className: "text-2xl" }}
                textareaProps={{ className: "text-2xl" }}
                multiline
                minRows={6}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className="mt-10">
            <div className="float-right flex gap-20">
              <FButton
                severity="bad"
                type="reset"
                className="float-right"
              >
                Reset
              </FButton>
              <FButton severity="good" type="submit" className="float-right">
                {!!flightSheet ? (
                  <div>Edit flight sheet with custom miner</div>
                ): (
                  <div>
                    Create flight sheet with custom miner
                  </div>
                )}
              </FButton>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
