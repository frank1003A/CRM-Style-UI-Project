import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-4 w-full text-muted-foreground h-screen flex items-center justify-center bg-neutral-50">
      <div className="flex flex-col items-center">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
