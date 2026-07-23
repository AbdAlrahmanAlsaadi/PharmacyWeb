import { useState } from "react";
import { FiFileText, FiDownload } from "react-icons/fi";

import { downloadReport } from "@/features/orders/api/orderApi";


function ReportsPage() {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);


    const handleDownload = async () => {

        try {

            setLoading(true);

            await downloadReport(
                startDate,
                endDate
            );

        } catch(error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="space-y-6">


            <div className="flex items-center gap-4">

                <div className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-emerald-100
                text-emerald-600
                ">

                    <FiFileText size={28}/>

                </div>


                <div>

                    <h1 className="
                    text-3xl
                    font-bold
                    text-slate-800
                    ">
                        Reports
                    </h1>

                    <p className="text-slate-500">
                        Generate and download orders reports
                    </p>

                </div>


            </div>



            <div className="
            rounded-2xl
            border
            bg-white
            p-8
            shadow-sm
            ">


                <h2 className="
                text-xl
                font-bold
                text-slate-800
                ">
                    Orders PDF Report
                </h2>


                <p className="
                mt-2
                text-sm
                text-slate-500
                ">
                    Select date range to generate report
                </p>



                <div className="
                mt-6
                grid
                gap-5
                md:grid-cols-2
                ">


                    <div>

                        <label className="
                        text-sm
                        font-medium
                        text-slate-700
                        ">
                            Start Date
                        </label>


                        <input
                        type="date"
                        value={startDate}
                        onChange={(e)=>
                            setStartDate(e.target.value)
                        }
                        className="
                        mt-2
                        w-full
                        rounded-xl
                        border
                        px-4
                        py-3
                        outline-none
                        focus:border-emerald-500
                        "
                        />

                    </div>



                    <div>

                        <label className="
                        text-sm
                        font-medium
                        text-slate-700
                        ">
                            End Date
                        </label>


                        <input
                        type="date"
                        value={endDate}
                        onChange={(e)=>
                            setEndDate(e.target.value)
                        }
                        className="
                        mt-2
                        w-full
                        rounded-xl
                        border
                        px-4
                        py-3
                        outline-none
                        focus:border-emerald-500
                        "
                        />

                    </div>


                </div>



                <button
                disabled={loading}
                onClick={handleDownload}
                className="
                mt-8
                flex
                items-center
                gap-2
                rounded-xl
                bg-emerald-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-emerald-700
                disabled:opacity-50
                "
                >

                    <FiDownload />

                    {
                        loading
                        ? "Generating..."
                        : "Download PDF"
                    }

                </button>


            </div>


        </div>

    );
}


export default ReportsPage;