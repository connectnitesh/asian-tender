import { useState } from 'react';
import axios from 'axios';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const DeleteTender = () => {
    const [tenderId, setTenderId] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleChange = (e) => {
        const { value } = e.target;
        setTenderId(value);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/delete-tender/${tenderId}`);
            console.log(response.data);
            // Handle success response
        } catch (error) {
            console.error('Error deleting tender:', error);
            // Handle error response
        } finally {
            setTenderId('');
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

            <form onSubmit={handleSubmit} className="mt-6 px-6">
                <div className="rounded-md bg-white shadow-md p-6 dark:bg-gray-800">
                    <div>
                        <label htmlFor="tenderId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tender ID</label>
                        <input
                            id="tenderId"
                            type="text"
                            value={tenderId}
                            onChange={handleChange}
                            placeholder="Enter Tender ID"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-800 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete Tender
                        </button>
                    </div>
                </div>
            </form>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-8 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-300">Confirm Deletion</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-400">Are you sure you want to delete this tender?</p>
                        <div className="mt-6 flex justify-end">
                            <button onClick={handleCloseConfirmation} className="mr-4 bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-500 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteTender;
