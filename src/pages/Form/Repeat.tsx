import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import RepeatSubjectBucket from '../../components/Tables/RepeatSubject';
import RepeatSubject from '../../components/Tables/RepeatSubject';
import Subject from '../../components/Tables/Subject';

const RepeatForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    year: '',
    semester: ''
  });

  // Handle input change and update state
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const jsonData = JSON.stringify(formData);
    console.log('Form Data as JSON:', jsonData);
    // You can send `jsonData` to an API endpoint here
  };


  return (
    <>
      <Breadcrumb pageName="Repeat Application" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Year</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Year</option>
                        <option value="3">3 Year</option>
                        <option value="4">4 Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Semester</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleInputChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Semester</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <Subject />
                </div>

              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <RepeatSubjectBucket />
          </div>
        </div>

        <div className="mb-5">
          <input
            type="submit"
            value="Next"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>

      </div>
    </>
  );
};

export default RepeatForm;
