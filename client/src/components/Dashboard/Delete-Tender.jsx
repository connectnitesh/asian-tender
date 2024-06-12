import { useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import withAdminAuth from "@/components/Auth/withAdminAuth";
import { asyncDeleteTender } from '@/api/api';
import cookie from 'js-cookie'

const DeleteTender = () => {
    const [tID, setTenderID] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const authorization = cookie.get('asiantoken_adn_');


    const handleChange = (e) => {
        const { value } = e.target;
        setTenderID(value);
    };

    const handleDelete = async () => {
        try {
            const response = await asyncDeleteTender(tID,authorization);
            if (response.status == "success") {
                alert(response.message);
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert("Error deleting tender!")
            console.error('Error deleting tender:', error);
        } finally {
            setTenderID('');
            setShowConfirmation(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <Breadcrumb pageName="Delete Tender" />
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white">Delete Tender</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-9 sm:grid-cols-2 mt-6 px-6">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Tender Details</h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Tender ID</label>
                                <input
                                    type="text"
                                    value={tID}
                                    required
                                    onChange={handleChange}
                                    placeholder="Enter Tender ID"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">Submit</h3>
                                </div>
                                <div className="flex flex-col gap-5.5 p-6.5">
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-blue-600 px-5 py-3 text-white font-medium transition hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                                    >
                                        Delete Tender
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-8">
                        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Confirm Deletion</h3>
                        <p className="text-sm text-black dark:text-white">Are you sure you want to delete this tender?</p>
                        <div className="mt-6 flex justify-end">
                            <button onClick={handleCloseConfirmation} className="mr-4 bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded-md text-sm font-medium text-black dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-700">Cancel</button>
                            <button onClick={handleDelete} className="bg-rose-600 dark:bg-rose-700 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-red-700">Delete</button>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};

export default withAdminAuth(DeleteTender);
