import SmallCard from '@/Components/SmallCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const { total_balance, profit,loss,withdrawal,loan,totatUser} = usePage().props;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-wrap gap-4 p-4  p-6 text-gray-900 dark:text-gray-100">
                            <SmallCard
                                title="Total Users"
                                value={totatUser ?? 0}
                                icon="fa-users"
                                bgColor="bg-blue-500"
                                textColor="text-white"
                             />
                             <SmallCard
                                title="Balance"
                                value={`₹${total_balance ?? 0}`}
                                icon="fa-wallet"
                                bgColor="bg-yellow-500"
                                textColor="text-black"
                            />
                            <SmallCard
                                title="Withdrawal"
                                value={`₹${withdrawal ?? 0}`}
                                icon="fa-rupee-sign"
                                bgColor="bg-pink-500"
                                textColor="text-white"
                            />
                            <SmallCard
                                title="Loan"
                                value={`₹${loan ?? 0}`}
                                icon="fa-credit-card"
                                bgColor="bg-purple-500"
                                textColor="text-white"
                            />
                            <SmallCard
                                title="Total Profit"
                                value={`₹${profit ?? 0}`}
                                icon="fa-rupee-sign"
                                bgColor="bg-green-500"
                                textColor="text-white"
                            />
                             <SmallCard
                                title="Loss"
                                value={`₹${loss ?? 0}`}
                                icon="fa-chart-line"
                                bgColor="bg-red-500"
                                textColor="text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
