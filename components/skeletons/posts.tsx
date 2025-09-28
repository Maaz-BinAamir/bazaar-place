import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function PostsSkeleton() {
  return (
    <div className="px-2 py-4 m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 space-x-2">
      {Array.from({ length: 8 }, (_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader>
            <div className="w-full h-50 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-20" />
            <div className="h-10 bg-gray-200 rounded w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
