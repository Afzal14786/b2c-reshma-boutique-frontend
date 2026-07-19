export default function CategoryPage({ params }: { params: { category: string } }) {
  return <div>Category: {params.category}</div>;
}
