import { useState, useRef } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import withAdminAuth from "@/components/Auth/withAdminAuth";
import { asyncUpdateTender } from '@/api/api';
import cookie from 'js-cookie'


const UpdateTender = () => {
    const [tenderData, setTenderData] = useState({
        tID: '',
        title: '',
        state: '',
        category: '',
        value: '',
        closeDate: '',
        tenderDoc: null,
    });

    const authorization = cookie.get('asiantoken_adn_');

    const fileInputRef = useRef(null);


    const stateOptions = {
        "ANC": "Andaman and Nicobar Islands",
        "AP": "Andhra Pradesh",
        "AR": "Arunachal Pradesh",
        "AS": "Assam",
        "BR": "Bihar",
        "CH": "Chandigarh",
        "CG": "Chhattisgarh",
        "DN": "Dadra and Nagar Haveli",
        "DD": "Daman and Diu",
        "DL": "Delhi",
        "GEM": "GEM TENDER",
        "GA": "Goa",
        "GJ": "Gujarat",
        "HR": "Haryana",
        "HP": "Himachal Pradesh",
        "JK": "Jammu and Kashmir",
        "JH": "Jharkhand",
        "KA": "Karnataka",
        "KL": "Kerala",
        "LA": "Ladakh",
        "LD": "Lakshadweep",
        "MP": "Madhya Pradesh",
        "MH": "Maharashtra",
        "MN": "Manipur",
        "ML": "Meghalaya",
        "MZ": "Mizoram",
        "MS": "Multi state",
        "NL": "Nagaland",
        "OD": "Odisha",
        "PY": "Puducherry",
        "PB": "Punjab",
        "RJ": "Rajasthan",
        "SK": "Sikkim",
        "TN": "Tamil Nadu",
        "TG": "Telangana",
        "TR": "Tripura",
        "UP": "Uttar Pradesh",
        "UK": "Uttarakhand",
        "WB": "West Bengal"
    };

    const categoryOptions = {
        "AC": "Air Condition",
        "AI": "Architect / Interior",
        "BHE": "Boiling House Equipment",
        "BRB": "Bridge Bearing",
        "BRC": "Bridge Construction",
        "BCO": "Bridge Consultancy",
        "CW": "Civil work",
        "CON": "Consultancy",
        "DRO": "Drone",
        "FF": "Fire Fighting",
        "FRI": "Fire resistant items",
        "GDT": "Garden Tools",
        "GIS": "GIS Survey",
        "HW": "Horticulture Work",
        "HKS": "Housekeeping Services",
        "LI": "Laboratory Items",
        "LEE": "Lift / Elevator / Escalator",
        "MPS": "Manpower Supply",
        "ME": "Medical Equipments",
        "MRW": "Meter Reading Work",
        "MIS": "Misc.",
        "PST": "Pre school kit / TLM",
        "SEQ": "Security Equipments",
        "SEC": "Security Services",
        "SW": "Software",
        "SP": "Solar Products",
        "TD": "Tubewell Drilling"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTenderData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setTenderData({ ...tenderData, tenderDoc: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tID', tenderData.tID);
        formData.append('title', tenderData.title);
        formData.append('state', tenderData.state);
        formData.append('category', tenderData.category);
        formData.append('value', tenderData.value);
        formData.append('closeDate', tenderData.closeDate);
        if (tenderData.tenderDoc) {
            formData.append('tenderDoc', tenderData.tenderDoc);
        }

        try {
            const response = await asyncUpdateTender(formData, authorization);
            if(response.status == "success"){
                alert(response.message);
                
            }else{
                alert(response.message);
            }
        } catch (error) {
            alert("Error updating tender")
            console.error('Error updating tender:', error);
        }finally {
            setTenderData({
                tID: '',
                title: '',
                state: '',
                category: '',
                value: '',
                closeDate: '',
                tenderDoc: null,
            });

            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }

        }
    };


    return (
        <>
            <Breadcrumb pageName="Update Tender" />
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white">Update Tender</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-9 sm:grid-cols-2 mt-6">
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
                                    name="tID"
                                    value={tenderData.tID}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Tender ID"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={tenderData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter tender title"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">State</label>
                                <select
                                    name="state"
                                    value={tenderData.state}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active                                    :cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                    <option value="">Select state...</option>
                                    {Object.entries(stateOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Category</label>
                                <select
                                    name="category"
                                    value={tenderData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                    <option value="">Select category...</option>
                                    {Object.entries(categoryOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Value</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={tenderData.value}
                                    onChange={handleChange}
                                    placeholder="Enter value"
                                    required
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Close Date</label>
                                <input
                                    type="date"
                                    name="closeDate"
                                    value={tenderData.closeDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Upload Tender Document (PDF only, max size 10 MB)</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    name="tenderDoc"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    required
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus"
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
                                        Update Tender
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    );
};

export default withAdminAuth(UpdateTender);

