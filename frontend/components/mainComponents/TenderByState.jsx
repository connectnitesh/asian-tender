import { useState } from 'react';
import axios from 'axios';

function TenderByState({ setTenders, setLoad }) {
  const [states, setStates] = useState([
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Multi state",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ]);

  const filterState = async (selectedState) => {
    try {
      const response = await axios.post('http://localhost:4000/api/filter', {
        state: selectedState,
        page: '',
        limit: '',
      });

      if (response.data.status === 'SUCCESS') {
        setTenders(response.data.data.data);
        setLoad(true);
      } else {
        console.error('Error fetching tenders:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching tenders:', error);
    }
  };

  return (
    <div className="h-60 w-52 overflow-y-scroll">
      {states.map((state) => (
        <p className="cursor-pointer" key={state} onClick={() => filterState(state)}>
          {state}
        </p>
      ))}
    </div>
  );
}

export default TenderByState;
