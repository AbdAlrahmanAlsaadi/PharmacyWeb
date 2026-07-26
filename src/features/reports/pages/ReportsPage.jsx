import { useState } from "react";
import {
  FiCalendar,
  FiDownload,
  FiEye,
  FiFileText,
  FiX,
} from "react-icons/fi";

import { downloadReport } from "@/features/orders/api/orderApi";


function ReportsPage() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);

  const [pdfUrl, setPdfUrl] = useState(null);



  const handleDownload = async () => {

    try {

      setLoading(true);


      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }


      const blob = await downloadReport(
        startDate,
        endDate
      );


      const url = URL.createObjectURL(blob);


      setPdfUrl(url);


    } catch(error) {

      console.log(error);


    } finally {

      setLoading(false);

    }

  };




  const closePreview = () => {

    if(pdfUrl){

      URL.revokeObjectURL(pdfUrl);

    }

    setPdfUrl(null);

  };





  return (

    <div className="space-y-8">



      {/* Header */}

      <div
        className="
        flex
        items-center
        gap-5
        rounded-3xl
        bg-gradient-to-r
        from-emerald-600
        to-emerald-500
        p-8
        text-white
        shadow-xl
        "
      >


        <div
          className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          bg-white/20
          "
        >

          <FiFileText size={38}/>

        </div>



        <div>

          <h1 className="text-4xl font-bold">
            Reports Center
          </h1>


          <p className="mt-2 text-emerald-100">
            Generate, preview and download pharmacy reports.
          </p>


        </div>


      </div>







      {/* Generate Card */}


      <div
        className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-lg

        dark:border-slate-700
        dark:bg-slate-800
        "
      >


        <div className="mb-8 flex items-center gap-3">


          <FiCalendar
            size={24}
            className="text-emerald-600"
          />


          <h2
            className="
            text-2xl
            font-bold
            text-slate-800

            dark:text-white
            "
          >
            Generate Orders Report
          </h2>


        </div>





        <div className="grid gap-6 md:grid-cols-2">


          <div>


            <label
              className="
              mb-2
              block
              font-semibold
              text-slate-700

              dark:text-slate-300
              "
            >
              Start Date
            </label>



            <input

              type="date"

              value={startDate}

              onChange={(e)=>
                setStartDate(e.target.value)
              }

              className="
              w-full
              rounded-2xl
              border-2
              border-slate-200
              bg-slate-50
              px-5
              py-4
              text-slate-800
              outline-none
              transition

              focus:border-emerald-500
              focus:bg-white
              focus:ring-4
              focus:ring-emerald-100

              dark:border-slate-600
              dark:bg-slate-700
              dark:text-white
              dark:focus:bg-slate-700
              "

            />


          </div>





          <div>


            <label
              className="
              mb-2
              block
              font-semibold
              text-slate-700

              dark:text-slate-300
              "
            >
              End Date
            </label>




            <input

              type="date"

              value={endDate}

              onChange={(e)=>
                setEndDate(e.target.value)
              }


              className="
              w-full
              rounded-2xl
              border-2
              border-slate-200
              bg-slate-50
              px-5
              py-4
              text-slate-800
              outline-none
              transition

              focus:border-emerald-500
              focus:bg-white
              focus:ring-4
              focus:ring-emerald-100

              dark:border-slate-600
              dark:bg-slate-700
              dark:text-white
              dark:focus:bg-slate-700
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
          gap-3
          rounded-2xl
          bg-emerald-600
          px-8
          py-4
          font-semibold
          text-white
          shadow-lg
          transition

          hover:-translate-y-1
          hover:bg-emerald-700
          hover:shadow-xl

          disabled:opacity-50
          "

        >


          <FiEye/>


          {
            loading
            ? "Generating..."
            : "Generate Report"
          }


        </button>



      </div>







      {/* Preview */}


      {
        pdfUrl ? (


          <div
            className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-xl

            dark:border-slate-700
            dark:bg-slate-800
            "
          >



            <div className="mb-6 flex items-center justify-between">


              <div>


                <h2
                  className="
                  text-2xl
                  font-bold
                  text-slate-800

                  dark:text-white
                  "
                >
                  PDF Preview
                </h2>


                <p
                  className="
                  mt-2
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                  "
                >
                  Review your report before downloading it.
                </p>


              </div>





              <div className="flex gap-3">



                <button

                  onClick={closePreview}

                  className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-300
                  px-5
                  py-3
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-100

                  dark:border-slate-600
                  dark:text-slate-200
                  dark:hover:bg-slate-700
                  "

                >

                  <FiX/>

                  Close

                </button>





                <a

                  href={pdfUrl}

                  download={`orders-report-${Date.now()}.pdf`}

                  className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-blue-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  shadow-md
                  transition

                  hover:bg-blue-700
                  "

                >

                  <FiDownload/>

                  Download PDF


                </a>



              </div>



            </div>





            <div
              className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              shadow-inner

              dark:border-slate-700
              "
            >

              <iframe

                src={pdfUrl}

                title="Orders Report"

                className="
                h-[850px]
                w-full
                bg-slate-100
                "

              />

            </div>



          </div>



        ) : (



          <div
            className="
            rounded-3xl
            border-2
            border-dashed
            border-slate-300
            bg-slate-50
            py-24
            text-center

            dark:border-slate-700
            dark:bg-slate-900
            "
          >


            <FiFileText

              size={70}

              className="
              mx-auto
              text-slate-300
              "

            />



            <h3
              className="
              mt-6
              text-2xl
              font-bold
              text-slate-700

              dark:text-white
              "
            >

              No Report Generated

            </h3>




            <p
              className="
              mt-3
              text-slate-500

              dark:text-slate-400
              "
            >

              Select dates and click

              <span className="font-semibold text-emerald-600">

                {" "}
                Generate Report

              </span>

              {" "}
              to preview your PDF report.


            </p>



          </div>


        )

      }




    </div>

  );

}


export default ReportsPage;