import Link from "next/link";
import Card from "@/components/Card";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-6">
            <Card>
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-semibold">404</h1>

                    <p className="text-muted-foreground">
                        The page you are looking for does not exist or has been moved.
                    </p>

                    <div className="flex justify-center gap-4 pt-2">
                        <Link
                            href="/"
                            className="text-sky-600 hover:underline dark:text-sky-400"
                        >
                            Go home
                        </Link>

                        <Link
                            href="/publications"
                            className="text-sky-600 hover:underline dark:text-sky-400"
                        >
                            Publications
                        </Link>

                        <Link
                            href="/cv"
                            className="text-sky-600 hover:underline dark:text-sky-400"
                        >
                            CV
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
}