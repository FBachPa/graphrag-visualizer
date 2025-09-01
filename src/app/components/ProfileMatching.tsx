// src/components/ProfileMatching.tsx

import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography } from "@mui/material";
import DataTable from './DataTable';
import { MRT_ColumnDef } from "material-react-table";
import { useNavigate, useLocation } from "react-router-dom";

export type CandidateProfile = {
  id: string;
  name: string;
  score: number;
  skills: string[];
  experience: number;
};

const mockCandidates: CandidateProfile[] = [
  { id: '1', name: 'Alice Smith', score: 85, skills: ['React', 'TypeScript'], experience: 5 },
  { id: '2', name: 'Bob Johnson', score: 92, skills: ['Python', 'LLMs'], experience: 7 },
  { id: '3', name: 'Carol Lee', score: 78, skills: ['Java', 'Backend'], experience: 4 },
  // Add more mock profiles if desired
];

const columns: MRT_ColumnDef<CandidateProfile>[] = [
  { header: 'Candidate', accessorKey: 'name' },
  { header: 'Matching Score', accessorKey: 'score' },
  { 
    header: 'Skills', 
    accessorKey: 'skills',
    Cell: ({ cell }) => (cell.getValue<string[]>() || []).join(', ')
  },
  { header: 'Experience', accessorKey: 'experience' },
];

const tabPaths = ["/upload", "/graph", "/data", "/profile-matching"];

const ProfileMatching: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(3);

  useEffect(() => {
    switch (location.pathname) {
      case "/upload":
        setTabIndex(0);
        break;
      case "/graph":
        setTabIndex(1);
        break;
      case "/data":
        setTabIndex(2);
        break;
      case "/profile-matching":
        setTabIndex(3);
        break;
      default:
        setTabIndex(0);
    }
  }, [location.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(tabPaths[newValue], { replace: true });
  };

  return (
    <>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Upload Artifacts" />
        <Tab label="Graph Visualization" />
        <Tab label="Data Tables" />
        <Tab label="Profile Matching" />
      </Tabs>
      <Box p={3} sx={{ flexGrow: 1, overflow: "auto" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Profile Matching
        </Typography>
        <section style={{ marginBottom: '2rem' }}>
          <Box
            sx={{
              width: '90%',
              margin: '0 auto',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Job Description:
            </Typography>
            <textarea
              id="job-desc"
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              style={{
                width: '100%',
                minHeight: '100px',
                marginTop: 0,
                borderRadius: '8px',
                border: '1px solid #ccc',
                padding: '12px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                background: 'inherit',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
              placeholder="Write or paste job description here..."
            />
          </Box>
        </section>
        <section>
          <Box sx={{ width: '90%', margin: '0 auto' }}>
            <DataTable
              columns={columns}
              data={mockCandidates}
            />
          </Box>
        </section>
      </Box>
    </>
  );
};

export default ProfileMatching;
