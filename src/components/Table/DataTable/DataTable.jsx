import { Table, Card } from "antd";

export default function DataTable({ title, columns, data }) {
  return (
    <Card title={title}>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </Card>
  );
}
