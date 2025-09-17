import React, { useState } from "react";

function CompanyFilter({ setSelectedCompany }) {
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (company.trim()) {
      setSelectedCompany(company);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <label className="form-label">Enter Company Name</label>
      <input
        type="text"
        className="form-control"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="e.g., Infosys, TCS, Google"
      />
      <button type="submit" className="btn btn-primary mt-2">
        View Posts
      </button>
    </form>
  );
}

export default CompanyFilter;
