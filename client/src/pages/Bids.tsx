import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Bids() {
  const [, navigate] = useLocation();
  const { data: bids, isLoading } = trpc.bids.list.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bids & Estimates</h1>
        <Button onClick={() => navigate("/bids/new")}>Create Bid</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bids</CardTitle>
        </CardHeader>
        <CardContent>
          {bids && bids.length > 0 ? (
            <div className="space-y-2">
              {bids.map(bid => (
                <div key={bid.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{bid.bidNumber}</p>
                    <p className="text-sm text-muted-foreground">{bid.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${bid.totalAmount}</p>
                    <p className="text-sm text-muted-foreground">{bid.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No bids yet. Create one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
