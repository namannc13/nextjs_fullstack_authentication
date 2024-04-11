import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserProfile({ params }: any) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Profile</CardTitle>
          <CardDescription>{params.id}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
