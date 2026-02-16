import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
    },
];

export default function Index() {
    const { flash } = usePage<{
        flash?: { success?: string; error?: string };
    }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(!!flashMessage);

    useEffect(() => {
        if (!flashMessage) return;
        const timer = setTimeout(() => setShowAlert(false), 3000);
        return () => clearTimeout(timer);
    }, [flashMessage]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Managment" />
            <div className="h-ful l flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {showAlert && flashMessage && (
                    <Alert
                        variant={'default'}
                        className={`${flash?.success ? 'bg-green-800' : flash?.error ? 'bg-red-800' : ''} ml-auto max-w-md text-white`}
                    >
                        <AlertDescription className="text-white">
                            {flash.success ? 'Success!' : 'Error!'}{' '}
                            {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="ml-auto">
                    <Link
                        as="button"
                        href="/products/create"
                        className="text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                    >
                        Add Product
                    </Link>
                </div>
                <div className="overflow-hidden rounded-lg border shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-600 text-white">
                                <th className="border p-4">#</th>
                                <th className="border p-4">Name</th>
                                <th className="border p-4">Description</th>
                                <th className="border p-4">Price</th>
                                <th className="border p-4">Featured Image</th>
                                <th className="border p-4">Created Date</th>
                                <th className="border p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 text-center">
                                    1
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    Mobile Phone
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    Mobile phone description
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    12000
                                </td>
                                <td className="border px-4 py-2 text-center"></td>
                                <td className="border px-4 py-2 text-center">
                                    2026/02/02
                                </td>
                                <td className="border px-4 py-2 text-center"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
