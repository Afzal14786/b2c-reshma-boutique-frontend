export default function CustomerDetail({ params }: { params: { id: string } }) {
  return <div>Customer {params.id}</div>;
}
