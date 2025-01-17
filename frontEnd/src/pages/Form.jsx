import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const inspectionForms = {
  Classroom: [
    { id: 1, question: "Housekeeping: Cleanliness, waste disposal, surface dust levels", field: "housekeeping" },
    { id: 2, question: "Floors, Aisles & Exits: Clear and unobstructed", field: "floorsAislesExits" },
    { id: 3, question: "Classroom Furniture: Good condition, no safety hazards", field: "classroomFurniture" },
    { id: 4, question: "Lighting: Functioning lights, need for bulb replacement", field: "lighting" },
    { id: 5, question: "Electrical Safety: Condition of cords, plugs, outlets", field: "electricalSafety" },
    { id: 6, question: "Fire Safety: Unobstructed sprinkler heads, ceiling tiles installed", field: "fireSafety" },
    { id: 7, question: "Security/Personal Safety: Functional locks, proper window coverings", field: "securitySafety" },
    { id: 8, question: "First Aid Cabinet: Accessible and well-stocked", field: "firstAidCabinet" }
  ],
  Office: [
    { id: 1, question: "Housekeeping: Cleanliness, garbage disposal, low dust", field: "housekeeping" },
    { id: 2, question: "Office Furniture and Equipment: Good condition, no safety hazards", field: "furnitureEquipment" },
    { id: 3, question: "Floors, Aisles & Exits: Clean and clear", field: "floorsAislesExits" },
    { id: 4, question: "Lighting: Functional lights, no need for replacement", field: "lighting" },
    { id: 5, question: "Electrical Safety: Condition of cords, plugs, outlets", field: "electricalSafety" },
    { id: 6, question: "Security/Personal Safety: Valuables handling, evacuation plans", field: "securityPersonalSafety" },
    { id: 7, question: "Fire Safety: Sprinkler heads unobstructed, extinguisher inspections", field: "fireSafety" },
    { id: 8, question: "First Aid Cabinet: Accessible and well-stocked", field: "firstAidCabinet" }
  ],
  Shop: [
    { id: 1, question: "Aisles and Passages: Clear and well-marked", field: "aislesPassages" },
    { id: 2, question: "Floor Surface: Clean, no slipping risks", field: "floorSurface" },
    { id: 3, question: "Walls/Partitions: Clean and used for visual controls", field: "wallsPartitions" },
    { id: 4, question: "Windows: Clean and unobstructed", field: "windows" },
    { id: 5, question: "Columns and Ceiling: Clean and properly identified", field: "columnsCeiling" },
    { id: 6, question: "Lighting: Properly located, adequate for tasks", field: "lighting" },
    { id: 7, question: "Electrical Apparatus: Clean, accessible panels", field: "electricalApparatus" }
  ],
  Maintenance: [
    { id: 1, question: "General Safety: Cleanliness, waste disposal, PPE, chemical safety", field: "generalSafety" },
    { id: 2, question: "Floors, Aisles & Exits: Clear and unobstructed", field: "floorsAislesExits" },
    { id: 3, question: "Lighting: Proper lighting and bulb replacement", field: "lighting" },
    { id: 4, question: "Shelving: Secure, proper storage, safety hazards", field: "shelving" },
    { id: 5, question: "Electrical Safety: Safe cords, plugs, sockets, extension cords", field: "electricalSafety" }
  ],
  Laboratory: [
    { id: 1, question: "Signage: Visible emergency contact, safety, operating hazard signs", field: "signage" },
    { id: 2, question: "General Lab Safety: Tidy work areas, well-stocked first aid kit", field: "labSafety" },
    { id: 3, question: "Emergency Evacuation: Unobstructed exits, evacuation procedures", field: "emergencyEvacuation" },
    { id: 4, question: "Fire Extinguishers: Proper type, inspection status", field: "fireExtinguishers" },
    { id: 5, question: "Employee Training: Adequate safety training and manuals", field: "employeeTraining" },
    { id: 6, question: "Personal Protective Equipment: Proper use of PPE", field: "ppe" },
    { id: 7, question: "Chemical Storage and Handling: Correct labeling and storage", field: "chemicalStorage" },
    { id: 8, question: "Safety Showers and Eye Wash Stations: Operational and inspected", field: "safetyShowers" },
    { id: 9, question: "Fume Hoods: Properly functioning and uncluttered", field: "fumeHoods" },
    { id: 10, question: "Flammable Storage Cabinets: Proper condition and storage", field: "flammableStorage" },
    { id: 11, question: "Chemical Waste: Proper labeling and disposal procedures", field: "chemicalWaste" },
    { id: 12, question: "Sharps and Biological Waste: Proper disposal containers", field: "sharpsBiologicalWaste" }
  ],
  Culinary: [
    { id: 1, question: "General Safety: Cleanliness, waste disposal, appropriate PPE", field: "generalSafety" },
    { id: 2, question: "Work Environment: No infestations, clean dumpster areas", field: "workEnvironment" },
    { id: 3, question: "Floors, Aisles & Exits: Clear, clean aisles, proper storage", field: "floorsAislesExits" },
    { id: 4, question: "Lighting: Proper lighting for tasks", field: "lighting" },
    { id: 5, question: "Shelving: Secure shelves, proper storage", field: "shelving" },
    { id: 6, question: "Stacked Material: Stable and orderly storage", field: "stackedMaterial" },
    { id: 7, question: "Electrical Safety: Proper maintenance of electrical equipment", field: "electricalSafety" },
    { id: 8, question: "Machinery: Safety guards, secure mounting, maintenance", field: "machinery" },
    { id: 9, question: "Gas/Fire Safety: Training, fire extinguisher inspections", field: "gasFireSafety" }
  ]
};

const Form = () => {
  const [formType, setFormType] = useState("Classroom");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleTypeChange = (e) => {
    setFormType(e.target.value);
    setFormData({});
    setErrors({});
    setIsFormValid(false);
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: false });
  };

  const validateForm = () => {
    let isValid = true;
    let validationErrors = {};

    inspectionForms[formType].forEach((field) => {
      if (!formData[field.field]) {
        isValid = false;
        validationErrors[field.field] = "*This field is required"; // Error message
      }

      if (formData[field.field] === "No") {
        if (
          !formData[`${field.field}Deficiency`] ||
          !formData[`${field.field}Action`] ||
          !formData[`${field.field}Person`] ||
          !formData[`${field.field}Date`]
        ) {
          isValid = false;
          validationErrors[field.field] = "*Please fill out all required fields for 'No' answer"; // Specific error for 'No'
        }
      }
    });

    setErrors(validationErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .post("/api/inspections", { type: formType, data: formData })
      .then(() => {
        alert("Inspection created successfully!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error creating inspection:", error);
        alert("Failed to create inspection.");
      });
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md py-4 px-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">New Inspection</h1>
      </header>
      <main className="container mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="type">Inspection Type</label>
            <select
              id="type"
              value={formType}
              onChange={handleTypeChange}
              required
              className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Object.keys(inspectionForms).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {inspectionForms[formType].map((field) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">{field.question}</label>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className={`btn ${formData[field.field] === "Yes" ? "btn-success active" : "btn-outline-secondary"}` }
                  role="button"
                >
                  <input
                    type="radio"
                    name={field.field}
                    value="Yes"
                    checked={formData[field.field] === "Yes"}
                    onChange={(e) => handleChange(e, field.field)}
                    className="d-none"
                    required
                  />
                  YES
                </label>
                <label
                  className={`btn ${formData[field.field] === "No" ? "btn-danger active" : "btn-outline-secondary"}` }
                  role="button"
                >
                  <input
                    type="radio"
                    name={field.field}
                    value="No"
                    checked={formData[field.field] === "No"}
                    onChange={(e) => handleChange(e, field.field)}
                    className="d-none"
                    required
                  />
                  NO
                </label>
                <label
                  className={`btn ${formData[field.field] === "N/A" ? "btn-secondary active" : "btn-outline-secondary"}` }
                  role="button"
                >
                  <input
                    type="radio"
                    name={field.field}
                    value="N/A"
                    checked={formData[field.field] === "N/A"}
                    onChange={(e) => handleChange(e, field.field)}
                    className="d-none"
                    required
                  />
                  N/A
                </label>
              </div>

              {/* Display error message in red */}
              {errors[field.field] && (
                <div className="text-red-600 text-sm font-bold mt-2">{errors[field.field]}</div>
              )}

              {/* If "No" is selected, make these fields required */}
              {formData[field.field] === "No" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Deficiency"
                    value={formData[`${field.field}Deficiency`] || ""}
                    onChange={(e) => handleChange(e, `${field.field}Deficiency`)}
                    className="w-full px-4 py-2 border rounded shadow mb-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Action to rectify"
                    value={formData[`${field.field}Action`] || ""}
                    onChange={(e) => handleChange(e, `${field.field}Action`)}
                    className="w-full px-4 py-2 border rounded shadow mb-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Person Responsible"
                    value={formData[`${field.field}Person`] || ""}
                    onChange={(e) => handleChange(e, `${field.field}Person`)}
                    className="w-full px-4 py-2 border rounded shadow mb-2"
                    required
                  />
                  <input
                    type="date"
                    value={formData[`${field.field}Date`] || ""}
                    onChange={(e) => handleChange(e, `${field.field}Date`)}
                    className="w-full px-4 py-2 border rounded shadow"
                    required
                  />
                </div>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className={`px-6 py-2 rounded shadow ${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"} text-white`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default Form;