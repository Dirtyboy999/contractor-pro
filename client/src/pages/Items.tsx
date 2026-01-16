import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Items() {
  const [, navigate] = useLocation();
  const { data: items, isLoading } = trpc.items.list.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Item Catalog</h1>
        <Button onClick={() => navigate("/items/new")}>Add Item</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Items</CardTitle>
        </CardHeader>
        <CardContent>
          {items && items.length > 0 ? (
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.price}</p>
                    <p className="text-sm text-muted-foreground">{item.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No items yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
